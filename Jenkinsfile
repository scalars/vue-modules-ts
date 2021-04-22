#!/usr/bin/env groovy
pipeline {
    agent any
    environment {
        def PROJECT_NAME = 'modules.scalars.co'
    }
    stages {
        stage("Prepare Scripts") {
            steps {
                script {
                    echo "${PROJECT_NAME} Project name to deploy"
                    echo "${env.BRANCH_NAME} Branch name to deploy"
                    echo "${env.TAG_NAME} Tag name to deploy"
                    sh "aws --profile ci s3 sync s3://continuousintegration/scripts ./"
                    sh "chmod 755 ./*.sh"
                }
            }
        }
        stage('Deploy StoryBook') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main'
                }
            }
            steps {
                steps {
                    echo 'Building enviroment...'
                    sh ". ./deployStaticSite.sh && evaluateBrachName vuemodules.scalars.co ${PROJECT_NAME}"
                }
            }
        }
    }
}
