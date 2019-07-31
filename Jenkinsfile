pipeline {
    
    agent any 
	
    stages {
        
        
        stage('Build') { 
            steps {
                sh 'mvn -B -DskipTests clean package' 
            }
        }
        
        
        stage('Test') {
            steps {
                sh 'mvn test'
            }
//            post {
//               always {
//                 junit 'target/surefire-reports/*.xml'
//               }
//            }
        }
        

//        stage('Checkstyle') {
//            steps {
//                sh 'mvn checkstyle:check'
//            }            
//        }

 
  stage('SonarQube analysis') {
  steps {
	    withSonarQubeEnv('sonarqube') {
	      // requires SonarQube Scanner for Maven 3.2+
	      sh 'mvn sonar:sonar'
	     }
    }
  
}
  		


// No need to occupy a node
stage("Quality Gate"){
steps {   
script {
  timeout(time: 1, unit: 'HOURS') { // Just in case something goes wrong, pipeline will be killed after a timeout
    def qg = waitForQualityGate() // Reuse taskId previously collected by withSonarQubeEnv
    if (qg.status != 'OK') {
      error "Pipeline aborted due to quality gate failure: ${qg.status}"
    }
	}
  }
  }
}




		} //sgates
	  		

  		
    } // pipeline

