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
        Mat gray = new Mat();
        Imgproc.cvtColor(src, gray, Imgproc.COLOR_BGR2GRAY);

        // Применение фильтрации для улучшения контраста
        Imgproc.GaussianBlur(gray, gray, new Size(5, 5), 0);

        // Применение алгоритма Кэнни для выделения границ
        Mat edges = new Mat();
        Imgproc.Canny(gray, edges, 100, 200);

        // Поиск контуров
        List<MatOfPoint> contours = new ArrayList<>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(edges, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);

        // Отрисовка контуров на исходном изображении
        Imgproc.drawContours(src, contours, -1, new Scalar(0, 255, 0), 2);

        MatOfByte bytes = new MatOfByte();
        Imgcodecs.imencode(".png", src, bytes);
        Imgcodecs.imwrite("output.jpg", src);

        return bytes.toArray();
    }

    public static byte[] contourOverlay(byte[] back, byte[] front) {
        Mat image1 = Imgcodecs.imdecode(new MatOfByte(back), Imgcodecs.IMREAD_UNCHANGED);
        Mat image2 = Imgcodecs.imdecode(new MatOfByte(front), Imgcodecs.IMREAD_UNCHANGED);
//        Mat gray = new Mat();
//        Imgproc.cvtColor(image1, gray, Imgproc.COLOR_BGR2GRAY);
//
//        // Применение фильтрации для улучшения контраста
//        Imgproc.GaussianBlur(gray, gray, new Size(5, 5), 0);
//
//        // Применение алгоритма Кэнни для выделения границ
//        Mat edges = new Mat();
//        Imgproc.Canny(gray, edges, 100, 200);
//
//        Imgcodecs.imwrite("1.jpg", gray);
//
//        // Поиск контуров
//        List<MatOfPoint> contours = new ArrayList<>();
//        Mat hierarchy = new Mat();
//        Imgproc.findContours(edges, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);
//
//        // Наложение второго изображения на контур первого
//        Imgproc.drawContours(image1, contours, -1, new Scalar(0, 255, 0), 2);
//        Imgcodecs.imwrite("2.jpg", image1);
//        Mat mask = new Mat();
//        Imgproc.fillPoly(mask, contours, new Scalar(255));
//        image2.copyTo(image1, mask);
//
//        Imgcodecs.imwrite("3.jpg", mask);
//        Imgcodecs.imwrite("4.jpg", image2);
//
//        MatOfByte bytes = new MatOfByte();
//        Imgcodecs.imencode(".png", image1, bytes);
//
//
//        return bytes.toArray();

        Imgproc.resize(image2, image2, new Size(image1.cols(), image1.rows()));

        // Создание маски для нижней половины изображения
        Mat maskBottomHalf = new Mat(image1.rows(), image1.cols(), CvType.CV_8UC1, Scalar.all(0));
        Rect bottomHalfRect = new Rect(0, image1.rows() / 2, image1.cols(), image1.rows() / 2);
        Mat roi = new Mat(maskBottomHalf, bottomHalfRect);
        roi.setTo(Scalar.all(255));

        // Наложение второго изображения на нижнюю половину контуров первого
        Mat contoursOverlay = new Mat();
        Core.bitwise_and(image1, image1, contoursOverlay); // Помещаем контуры на первое изображение

        Mat blendedImage = new Mat();
        Mat maskBottomHalfGray = new Mat();
        Mat maskBottomHalfBGR = new Mat();
        Imgproc.cvtColor(maskBottomHalf, maskBottomHalfGray, Imgproc.COLOR_BGR2GRAY);
        Imgproc.threshold(maskBottomHalfGray, maskBottomHalfGray, 100, 255, Imgproc.THRESH_BINARY);
        Imgproc.cvtColor(maskBottomHalfGray, maskBottomHalfBGR, Imgproc.COLOR_GRAY2BGR);
        Core.addWeighted(contoursOverlay, 0.5, maskBottomHalfBGR, 0.5, 0, blendedImage); // Наложение маски на верхнюю половину контуров
        Core.addWeighted(blendedImage, 1.0, image2, 1.0, 0, blendedImage); // Наложение второго изображения на нижнюю половину

        MatOfByte bytes = new MatOfByte();
        Imgcodecs.imencode(".png", blendedImage, bytes);


        return bytes.toArray();
    }

    private static void fitImageToSrc(Mat src, Mat image) {
        // Уравнивание размеров изображений
        Size newSize = new Size(src.cols(), src.rows());
        Imgproc.resize(image, image, newSize);
    }
}
