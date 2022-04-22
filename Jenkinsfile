
pipeline {
         agent any

         environment{
             dockerImage =''
             registry ='pavlohortovenko20/carrectlyweb'
             registryCredential ='dockerhub_cred'
         }
         stages {
                 stage('Checout') {
                 steps {
                     checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/carrectly/adminpage.git']]])
                    }
                 } 
                 stage('Remove older images') {
                 steps {
                     script{
                        sh 'docker rmi $(docker images -q)' 
                            }
                        }
                    }
                 stage('Build docker image') {
                 steps {
                     script {
                        dockerImage=docker.build registry
                      }
                    }
                 }
                 stage('Push image to registry') {
                 steps {
                     script{
                          docker.withRegistry( '', registryCredential ) {
                          dockerImage.push()
                          }
                        }
                    }
                }
                stage ('Update image by k8s cluster') {
                steps { 
                    script {
                          sh ''
                        }
                    }
                }
            }
        }
    