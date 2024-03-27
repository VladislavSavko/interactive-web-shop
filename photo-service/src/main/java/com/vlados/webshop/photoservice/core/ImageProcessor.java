package com.vlados.webshop.photoservice.core;


import org.opencv.core.*;
import org.opencv.features2d.FastFeatureDetector;
import org.opencv.features2d.Features2d;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;

import java.util.ArrayList;
import java.util.List;

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
//
//        if (image1.cols() != image2.cols() || image1.rows() / 2 != image2.rows()) {
//            Imgproc.resize(image2, image2, new Size(image1.cols(), image1.rows() / 2.0));
//        }
//
//        // Создайте новое изображение
//        Mat combinedImage = new Mat(image1.rows(), image1.cols(), image1.type());
//
//        // Создайте ROI для верхней половины первого изображения
//        Rect roiTop = new Rect(0, 0, image1.cols(), image1.rows() / 2);
//        Mat topRegion = combinedImage.submat(roiTop);
//
//        // Создайте ROI для нижней половины нового изображения
//        Rect roiBottom = new Rect(0, image1.rows() / 2, image1.cols(), image1.rows() / 2);
//        Mat bottomRegion = combinedImage.submat(roiBottom);
//
//        // Скопируйте верхнюю половину первого изображения в верхний ROI
//        image1.submat(roiTop).copyTo(topRegion);
//
//        // Скопируйте второе изображение в нижний ROI
//        image2.copyTo(bottomRegion);
//
//        return getBytes(combinedImage);

        Mat hsv = new Mat();
        Imgproc.cvtColor(image1, hsv, Imgproc.COLOR_BGR2HSV);

        // Define the lower and upper bounds for blue color in HSV
        Scalar lowerBlue = new Scalar(80, 50, 50);
        Scalar upperBlue = new Scalar(150, 255, 255);

        // Create a white mask for the blue color range
        Mat maskWhite = new Mat();
        Core.inRange(hsv, lowerBlue, upperBlue, maskWhite);

        // Invert the mask to create a black mask for everything except blue
        Mat maskBlack = new Mat();
        Core.bitwise_not(maskWhite, maskBlack);
        // Resize the design image to match the mask size (reversed order)
        Size maskSize = new Size(maskBlack.cols(), maskBlack.rows());
        Imgproc.resize(image2, image2, maskSize);

        // Create a 3-channel version of the mask (assuming mask_black is grayscale)
        Mat mask_black_3CH = new Mat();
        Imgproc.cvtColor(maskBlack, mask_black_3CH, Imgproc.COLOR_GRAY2BGR);

        // Combine design and mask using bitwise OR
        Mat design_mask_mixed = new Mat();
        Imgproc.resize(design_mask_mixed, design_mask_mixed, image2.size());
        Core.bitwise_or(mask_black_3CH, image2, design_mask_mixed);

        // Apply the combined mask to the original image using bitwise AND
        Mat finalMaskBlack3CH = new Mat();
        Core.bitwise_and(design_mask_mixed, image1, finalMaskBlack3CH);

        return getBytes(finalMaskBlack3CH);
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
}
