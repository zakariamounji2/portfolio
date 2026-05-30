# Backend Dockerfile for Spring Boot Java 21
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy the pom.xml first to take advantage of Docker layer caching
COPY pom.xml .
COPY src ./src
RUN mvn -B package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app

# FIX: Using the wildcard *.jar so it grabs the generated archive dynamically
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

