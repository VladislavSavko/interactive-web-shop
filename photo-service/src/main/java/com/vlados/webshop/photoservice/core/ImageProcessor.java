package com.vlados.webshop.photoservice.core;


import org.opencv.core.*;
import org.opencv.features2d.FastFeatureDetector;
import org.opencv.features2d.Features2d;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.util.ArrayList;
import java.util.List;

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
        Features2d.drawKeypoints(src, keypoints, dst, new Scalar(255, 0, 0), Features2d.DrawMatchesFlags_DRAW_RICH_KEYPOINTS);

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
//        Mat image2 = Imgcodecs.imdecode(new MatOfByte(front), Imgcodecs.IMREAD_UNCHANGED);
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



        int rectangleStartY = (int)(image1.rows() * 0.5); // Начало прямоугольника от середины изображения
        int rectangleHeight = (int)(image1.rows() * 0.5); // Высота прямоугольника до нижней части изображения
        Rect rectangle = new Rect(new Point(0, rectangleStartY), new Point(image1.cols(), image1.rows()));

        // Нарисуйте прямоугольник на изображении
        Imgproc.rectangle(image1, rectangle.tl(), rectangle.br(), new Scalar(0, 255, 0), 2);
        return getBytes(image1);
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
