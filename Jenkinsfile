pipeline {
    agent any
    tools { 
        nodejs "NODE_HOME" // Remplacez "Node14" par le nom que vous avez donné
    }
    stages {
        stage ('Build') {
            steps {
                script {
                    try {
                        // Assurez-vous que la branche est correcte
                        git branch: 'main', url: 'https://github.com/MedAmineHm/pfe-insomea-backend.git'
                        sh 'npm install'
                    } catch (err) {
                        echo "Une erreur s'est produite: ${err}"
                        error "Échec de l'étape de construction"
                    }
                }
            }
        }
    }
}
