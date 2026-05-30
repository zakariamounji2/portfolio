pipeline {
    agent any

    tools {
        dockerTool 'docker'
    }

    environment {
        REGISTRY_USER  = 'zakariamounji2'
        FRONTEND_IMAGE = 'nextjs-frontend'
        BACKEND_IMAGE  = 'springboot-backend'
        IMAGE_TAG      = "${BUILD_NUMBER}"
        DOCKER_API_VERSION = '1.40'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Parallel Build & Test') {
            parallel {
                
                stage('Build Frontend') {
                    agent {
                        docker {
                            image 'node:20-alpine'
                            // Reuses the workspace natively without broken host path mounts
                            reuseNode true 
                        }
                    }
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }

                stage('Build Backend') {
                    agent {
                        docker {
                            image 'maven:3.9-eclipse-temurin-17'
                            reuseNode true
                            // Keeps your maven cache healthy across builds
                            args '-v /root/.m2:/root/.m2' 
                        }
                    }
                    steps {
                        dir('backend') {
                            sh 'mvn clean package -DskipTests=false'
                        }
                    }
                }

            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${REGISTRY_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend"
                    sh "docker build -t ${REGISTRY_USER}/${FRONTEND_IMAGE}:latest ./frontend"

                    sh "docker build -t ${REGISTRY_USER}/${BACKEND_IMAGE}:${IMAGE_TAG} ./backend"
                    sh "docker build -t ${REGISTRY_USER}/${BACKEND_IMAGE}:latest ./backend"
                }
            }
        }

        stage('Deploy / Run Stack') {
            steps {
                script {
                    echo 'Images successfully built locally! Ready to deploy.'
                }
            }
        }
    }
}
