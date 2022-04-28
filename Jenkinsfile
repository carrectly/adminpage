
pipeline {
         agent any
         environment{
             PROJECT_ID = 'adminpage-chicago'
             CLUSTER_NAME = 'adminpage-chicago-k8s'
             LOCATION = 'us-east4-b'
             CREDENTIALS_ID = 'gke'
             registry ='pavlohortovenko20/adminpage2.1'
             registryCredential ='dockerhub_cred'
             gitgetvers ='git rev-parse --short  HEAD'
             kubernetesSetVersion ='kubectl set image deployment/adminpage-deployment adminpage2.1:latest=adminpage2.1:latest:${gitgetvers} --record'
            }
         stages {
                 stage('Checout') {
                 steps {
                     checkout([$class: 'GitSCM', branches: [[name: '*/pipeline']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/carrectly/adminpage.git']]])
                    }
                 } 
                 stage('Remove older images') {
                 steps {
                     script{
                        sh 'docker rmi $(docker images -q)' 
                            }
                        }
                    }
                 stage('Build') {
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
                 stage('Deploy to GKE') { 
                 steps {
                    step([
                    $class: 'KubernetesEngineBuilder',
                    projectId: env.PROJECT_ID,
                    clusterName: env.CLUSTER_NAME,
                    location: env.LOCATION,
                    manifestPattern: 'adminpage-deploy.yaml',
                    credentialsId: env.CREDENTIALS_ID,
                    verifyDeployments: true])
                    } 
                }
            }
        }