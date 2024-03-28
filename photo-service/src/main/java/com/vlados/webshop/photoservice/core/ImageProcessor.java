package com.vlados.webshop.photoservice.core;


import org.opencv.core.*;
import org.opencv.features2d.FastFeatureDetector;
import org.opencv.features2d.Features2d;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;

import java.util.ArrayList;
import java.util.List;

import static com.vlados.webshop.photoservice.core.OpenCvWrapper.bitwiseAnd;
import static com.vlados.webshop.photoservice.core.OpenCvWrapper.bitwiseOr;
import static org.opencv.features2d.Features2d.drawKeypoints;
import static org.opencv.highgui.HighGui.imshow;

public class ImageProcessor {
    public static byte[] erosion(byte[] originalImage) {
        Mat src = Imgcodecs.imdecode(new MatOfByte(originalImage), Imgcodecs.IMREAD_UNCHANGED);
        Mat dst = new Mat();

        Imgproc.erode(src, dst, new Mat(5, 5, CvType.CV_8U)); // Применяем операцию эрозии

        MatOfByte bytes = new MatOfByte();
        Imgcodecs.imencode(".png", dst, bytes);

        Imgcodecs.imwrite("output.jpg", dst);

        return bytes.toArray();
    }

    public static byte[] angles(byte[] originalImage) {
        Mat src = Imgcodecs.imdecode(new MatOfByte(originalImage), Imgcodecs.IMREAD_UNCHANGED);
        Mat gray = new Mat();
        Imgproc.cvtColor(src, gray, Imgproc.COLOR_BGR2GRAY);

        // Создание детектора FAST
        FastFeatureDetector fast = FastFeatureDetector.create(FastFeatureDetector.FAST_N);

        // Нахождение ключевых точек
        MatOfKeyPoint keypoints = new MatOfKeyPoint();
        fast.detect(gray, keypoints);
        keypoints.toList().forEach(keyPoint -> System.out.println("x" + keyPoint.pt.x + " " + "y" + keyPoint.pt.y));

        // Отрисовка ключевых точек на изображении
        Mat dst = new Mat();
        drawKeypoints(src, keypoints, dst, new Scalar(255, 0, 0), Features2d.DrawMatchesFlags_DRAW_RICH_KEYPOINTS);

        MatOfByte bytes = new MatOfByte();
        Imgcodecs.imencode(".png", dst, bytes);
        Imgcodecs.imwrite("output.jpg", dst);

        return bytes.toArray();
    }

    public static byte[] contour(byte[] originalImage) {
        Mat src = Imgcodecs.imdecode(new MatOfByte(originalImage), Imgcodecs.IMREAD_UNCHANGED);
        Rect bottomHalf = new Rect(0, src.rows() / 2, src.cols(), src.rows() / 2);
        Mat srcBottomHalf = src.submat(bottomHalf);
        Mat grayImage = new Mat();
        Imgproc.cvtColor(srcBottomHalf, grayImage, Imgproc.COLOR_BGR2GRAY);

        // Примените пороговое преобразование
        Mat thresholdedImage = new Mat();
        Imgproc.threshold(grayImage, thresholdedImage, 100, 255, Imgproc.THRESH_BINARY);

        // Найдите контуры
        List<MatOfPoint> contours = new ArrayList<>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(thresholdedImage, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);

        // Нарисуйте контуры красным цветом на новом изображении
        Mat contourImage = Mat.zeros(srcBottomHalf.size(), srcBottomHalf.type());
        Imgproc.drawContours(contourImage, contours, -1, new Scalar(0, 0, 255), 2);

        saveImage(contourImage);

        return getBytes(contourImage);
    }

    public static byte[] contourOverlay(byte[] back, byte[] front) {
        Mat image1 = Imgcodecs.imdecode(new MatOfByte(back), Imgcodecs.IMREAD_UNCHANGED);
        Mat image2 = Imgcodecs.imdecode(new MatOfByte(front), Imgcodecs.IMREAD_UNCHANGED);

        Mat hsv = new Mat();
        Mat maskWhite = new Mat();
        Mat maskBlack = new Mat();
        Mat dst3, dst3Wh = new Mat();
        Imgproc.cvtColor(image1, hsv, Imgproc.COLOR_BGR2HSV);

        // Define the lower and upper bounds for blue color in HSV
        Scalar lowerBlue = new Scalar(50, 50, 50);
        Scalar upperBlue = new Scalar(180, 255, 255);

        Core.inRange(hsv, lowerBlue, upperBlue, maskWhite);
        Core.bitwise_not(maskWhite, maskBlack);

        Mat maskBlackResized = new Mat();
        Imgproc.resize(maskBlack, maskBlackResized, image1.size());

// Преобразование одноканальной маски в трехканальное изображение
        Mat maskBlack3CH = new Mat(image1.size(), CvType.CV_8UC3);
        Imgproc.cvtColor(maskBlackResized, maskBlack3CH, Imgproc.COLOR_GRAY2BGR);

// Теперь можно выполнить побитовое И
        dst3 = new Mat();

        bitwiseAnd(maskBlack3CH, image1, dst3);
        bitwiseOr(maskWhite, dst3, dst3Wh);

        Imgproc.resize(image2, image2, new Size(maskBlack.cols(), maskBlack.rows()));

        Mat designMaskMixed = new Mat();
        Mat finalMaskBlack3Ch = new Mat();

        Mat imageWithFourChannels1 = new Mat(maskBlack.size(), CvType.CV_8UC4);

        // Добавление цветных каналов к одноканальному изображению
        Imgproc.cvtColor(maskBlack, imageWithFourChannels1, Imgproc.COLOR_GRAY2BGRA);

        // Установка альфа-канала в максимальное значение (255 - полностью непрозрачный)
        Core.add(imageWithFourChannels1, new Scalar(0, 0, 0, 255), imageWithFourChannels1);
        bitwiseOr(imageWithFourChannels1, image2, designMaskMixed);

        bitwiseAnd(designMaskMixed, dst3Wh, finalMaskBlack3Ch);

        return getBytes(finalMaskBlack3Ch);
    }

    public static byte[] legsDetection(byte[] image) {
        CascadeClassifier cascadeClassifier = new CascadeClassifier("haarcascade_fullbody.xml");

        // Загрузка изображения
        Mat src = Imgcodecs.imdecode(new MatOfByte(image), Imgcodecs.IMREAD_UNCHANGED);


        // Преобразование изображения в серый формат
        Mat grayImage = new Mat();
        Imgproc.cvtColor(src, grayImage, Imgproc.COLOR_BGR2GRAY);
        imshow("a", src);

        // Обнаружение нижней части тела
        MatOfRect lowerBodyDetections = new MatOfRect();
        cascadeClassifier.detectMultiScale(grayImage, lowerBodyDetections);

        // Рисование прямоугольников вокруг найденных объектов
        for (Rect rect : lowerBodyDetections.toArray()) {
            Imgproc.rectangle(src, rect.tl(), rect.br(), new Scalar(0, 255, 0), 2);
        }

        return getBytes(src);
    }

    private static byte[] getBytes(Mat image) {
        MatOfByte bytes = new MatOfByte();
        Imgcodecs.imencode(".jpeg", image, bytes);

        return bytes.toArray();
    }

    private static void saveImage(Mat image) {
        Imgcodecs.imwrite("output.jpeg", image);
    }

    private static void dev_compare(Mat mat1, Mat mat2) {
        System.out.println(mat1.size() + "     " + mat2.size());
        System.out.println(mat1.channels() + "     " + mat2.channels());
    }
}
