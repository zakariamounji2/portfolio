FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src
RUN mvn -B package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app

# FIX: Target the heavy boot jar explicitly by stripping out the ".original" file if it exists
# Or simply use the wildcard to a directory, then rename it
COPY --from=build /app/target/*.jar ./
RUN mv *.jar app.jar || true

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
