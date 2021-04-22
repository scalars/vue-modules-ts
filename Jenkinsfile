#!/usr/bin/env groovy
pipeline {
    agent any
    environment {
        def PROJECT_NAME = 'vuemodules.scalars.co'
    }
    stages {
        stage("Prepare Scripts") {
            steps {
                script {
                    echo "${PROJECT_NAME} Project name to deploy"
                    echo "${env.BRANCH_NAME} Branch name to deploy"
                    echo "${env.TAG_NAME} Tag name to deploy"
                    echo "${SUCCESS_TEST} Status test"
                    echo "${SUCCESS_INTEGRATION} Status test integration"
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
                sh "sh productionRelease.sh vuemodules.scalars.co.v1.2 ${PROJECT_NAME}"
            }
        }
    }
}
