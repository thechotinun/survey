pipeline {
    agent any

    environment {
        NEXT_PUBLIC_API_URL = credentials('NEXT_PUBLIC_API_URL')
    }

    stages {
        stage('Build and run containers') {
            steps {
                echo "Stopping and removing containers"
                sh 'docker-compose down --rmi all'
                
                echo "Building and running containers"
                sh '''
                    docker-compose build \
                        --build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
                    docker-compose up -d
                '''
            }
        }
    }
}