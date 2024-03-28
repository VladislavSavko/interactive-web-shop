package com.vlados.webshop.photoservice.core;

import org.opencv.core.*;
import org.opencv.imgproc.Imgproc;

public class OpenCvWrapper {
    public static void bitwiseAnd(Mat src1, Mat src2, Mat dst) {
        Size src2Size = src2.size();
        if (!src1.size().equals(src2Size)) {
            Imgproc.resize(src1, src1, src2Size);
        }
        int src1Channels = src1.channels();
        int src2Channels = src2.channels();
        if (src1Channels != src2Channels) {
            switch (src2Channels) {
                case 3 -> Core.bitwise_and(to3ChImage(src1), src2, dst);
                case 4 -> Core.bitwise_and(to4ChImage(src1), src2, dst);
            }
            return;
        }
        Core.bitwise_and(src1, src2, dst);
    }

    public static void bitwiseOr(Mat src1, Mat src2, Mat dst) {
        Size src2Size = src2.size();
        if (!src1.size().equals(src2Size)) {
            Imgproc.resize(src1, src1, src2Size);
        }
        int src1Channels = src1.channels();
        int src2Channels = src2.channels();
        if (src1Channels != src2Channels) {
            switch (src2Channels) {
                case 3 -> Core.bitwise_or(to3ChImage(src1), src2, dst);
                case 4 -> Core.bitwise_or(to4ChImage(src1), src2, dst);
            }
            return;
        }
        Core.bitwise_or(src1, src2, dst);
    }


    private static Mat to4ChImage(Mat changeable) {
        Mat _4Ch = new Mat(changeable.size(), CvType.CV_8UC4);

        if (changeable.channels() == 1) {
            Imgproc.cvtColor(changeable, _4Ch, Imgproc.COLOR_GRAY2BGRA);
        } else if (changeable.channels() == 3) {
            Imgproc.cvtColor(changeable, _4Ch, Imgproc.COLOR_BGR2BGRA);
        }
        // Установка альфа-канала в максимальное значение (255 - полностью непрозрачный)
        Core.add(_4Ch, new Scalar(0, 0, 0, 255), _4Ch);

        return _4Ch;
    }

    private static Mat to3ChImage(Mat changeable) {
        Mat _3Ch = new Mat();
        if (changeable.channels() != 4) {
            // Добавление цветных каналов к одноканальному изображению
            Imgproc.cvtColor(changeable, _3Ch, Imgproc.COLOR_GRAY2BGR);
        } else {
            Imgproc.cvtColor(changeable, _3Ch, Imgproc.COLOR_BGRA2BGR);
        }

        return _3Ch;
    }
}
