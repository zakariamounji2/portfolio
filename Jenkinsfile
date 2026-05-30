pipeline {
    agent any

    environment {
        REGISTRY_USER  = 'zakariamounji2'
        FRONTEND_IMAGE = 'nextjs-frontend'
        BACKEND_IMAGE  = 'springboot-backend'
        IMAGE_TAG      = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Parallel Docker Builds') {
            parallel {
                
                stage('Build Frontend Image') {
                    steps {
                        script {
                            // The compilation happens natively INSIDE the multi-stage build block
                            sh "docker build -t ${REGISTRY_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG} -t ${REGISTRY_USER}/${FRONTEND_IMAGE}:latest ./frontend"
                        }
                    }
                }

                stage('Build Backend Image') {
                    steps {
                        script {
                            // The maven packaging happens safely inside the isolated container layer context
                            sh "docker build -t ${REGISTRY_USER}/${BACKEND_IMAGE}:${IMAGE_TAG} -t ${REGISTRY_USER}/${BACKEND_IMAGE}:latest ./backend"
                        }
                    }
                }

            }
        }

        stage('Deploy Stack') {
            steps {
                script {
                    echo "Successfully built tracking tags version: ${IMAGE_TAG}"
                    echo "Ready to run docker-compose up!"
                }
            }
        }
    }
}
