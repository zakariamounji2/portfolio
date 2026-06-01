# --- Stage 1: Build ---
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src
RUN mvn -B package -DskipTests

# --- Stage 2: Runtime ---
FROM eclipse-temurin:21-jre
WORKDIR /app

# Since we set <finalName>app</finalName>, the file is guaranteed to be exactly this:
COPY --from=build /app/target/app.jar ./app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
