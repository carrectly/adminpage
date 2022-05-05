
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
         parameters {
             booleanParam(name: 'checkContainer', defaultValue: false, description: ' param of success remove images or skip')
         }
         stages {
                 stage('Checout') {
                 steps {
                     checkout([$class: 'GitSCM', branches: [[name: '*/pipeline']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/carrectly/adminpage.git']]])
                    }
                 } 
                 stage('Remove older images') {
                        when {
                            expression {
                                     params.checkContainer == false 
                                    }
                                }
                            }
                 steps {
                     script{
                        sh 'docker rmi $(docker images -q)' 
                            }
                        }
                    }
                 stage('Build')  {
                 steps  {
                     script {
                        sh 'echo GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID  >>.env'
                        sh 'echo GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET  >>.env'
                        sh 'echo GOOGLE_CALLBACK=$GOOGLE_CALLBACK  >>.env'
                        sh 'echo GOOGLE_REFRESH_TOKEN=$GOOGLE_REFRESH_TOKEN  >>.env'
                        sh 'echo DOMAIN =$DOMAIN  >>.env'
                        sh 'echo squareApplicationId =$squareApplicationId   >>.env'
                        sh 'echo SQUARE_TOKEN =$SQUARE_TOKEN  >>.env'
                        sh 'echo squareBasePath =$squareBasePath    >>.env'
                        sh 'echo SQUARE_LOCATION_ID=$SQUARE_LOCATION_ID  >>.env'
                        sh 'echo travisApiToken=$travisApiToken >>.env '
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