pipeline {
    agent any
    tools { 
        nodejs "NODE_HOME" // Remplacer par le nom de votre installation Node.js
    }
    stages {
        stage('Build') {
            steps {
                script {
                    try {
                        git branch: 'main', url: 'https://github.com/MedAmineHm/pfe-insomea-backend.git'
                        sh 'npm install'
                    } catch (err) {
                        echo "An error occurred during the build stage: ${err}"
                        error "Build stage failed"
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv ('sonarqube') {
                        sh 'npm install sonar-scanner'
                        sh 'npm run sonar'
                    }     
                } 
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image avec le tag correct
                    sh 'docker build -t mohamedamine1/backend-azure:backend .'
                }
            }
        }
        stage('Push Image to DockerHub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-pwd', variable: 'dockerhubpwd')]) {
                        // Utilisation sécurisée de l'authentification Docker
                        sh 'echo ${dockerhubpwd} | docker login -u mohamedamine1 --password-stdin'
                        
                        // Pousser l'image Docker vers Docker Hub
                        sh 'docker push mohamedamine1/backend-azure:backend'
                    }
                }
            }
        }
    }
}
