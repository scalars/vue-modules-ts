#!/usr/bin/env groovy
pipeline {
    agent any
    environment {
        def PROJECT_NAME = 'vuemodules.scalars.co'
        def SUCCESS_TEST = false
        def SUCCESS_INTEGRATION = false
    }
    stages {
        stage("Code Review Sonar and Eslint") {
            steps {
                script {
                    SUCCESS_INTEGRATION = true
                    echo "TODO Realizar scripts para revisión de código"
                }
            }
        }
        stage("Unit Test") {
            steps {
                script {
                    SUCCESS_TEST = true
                    echo "${SUCCESS_TEST} Resultado de los test"
                }
            }
        }
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
        stage('Development Deploy') {
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
