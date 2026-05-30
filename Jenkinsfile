pipeline {
    agent any

    tools {
        dockerTool 'docker'
    }

    environment {
        REGISTRY_USER = 'zakariamounji2'
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
                    steps {
                        dir('frontend') {
                            script {
                                // Switched from 'npm ci' to 'npm install' to handle workspaces without a pre-existing package-lock.json
                                sh '''
                                    docker run --rm -v "$(pwd)":/app -w /app node:20-alpine sh -c 'npm install && npm run build'
                                '''
                            }
                        }
                    }
                }

                stage('Build Backend') {
                    steps {
                        dir('backend') {
                            script {
                                // Uses native global container 'mvn' directly to bypass the missing local wrapper script error
                                sh '''
                                    docker run --rm -v "$(pwd)":/app -v /root/.m2:/root/.m2 -w /app maven:3.9-eclipse-temurin-17 sh -c 'mvn clean package -DskipTests=false'
                                '''
                            }
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
                    echo 'Images built locally. Ready to spin up using your root docker-compose.yml!'
                }
            }
        }
    }
}
