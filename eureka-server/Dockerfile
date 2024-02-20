FROM gradle:7-jdk17 AS builder
LABEL authors="vlados"
ENV APP_HOME=/app/
WORKDIR $APP_HOME
COPY build.gradle settings.gradle $APP_HOME
COPY src $APP_HOME/src/
RUN gradle build

FROM openjdk:17-oracle
ENV APP_HOME=/app/
ENV ARTIFACT_NAME=eureka-server-0.0.1-SNAPSHOT.jar
ARG JAR_FILE=$APP_HOME/build/libs/$ARTIFACT_NAME
COPY --from=builder $JAR_FILE /opt/eureka-server/app.jar
ENTRYPOINT ["java", "-jar", "/opt/eureka-server/app.jar"]