pipeline {
    agent any
    tools { 
        nodejs "NODE_HOME" // Replace "NODE_HOME" with your Node.js tool name
    }
    stages {
        stage ('Build') {
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
        stage('buils docker image') {
            steps{
              script{
                sh 'docker build -t backend-azure:backend . '
              }  
            }
        }


    }
}
