


```
workflow:
  rules:
    - if: $CI_COMMIT_BRANCH != "main" && $CI_PIPELINE_SOURCE != "merge_request_event"      
      when: never
    - when: always

stages:
  - build
  - test
  - deploy


before_script:
  - export REMOTE_USER=ubuntu
  - export REMOTE_MACHINE_IP=172.16.6.26
  - export DEPLOYMENT_DIR=/home/ubuntu/java-app/`date +%F-%H:%M:%S`
  - export DEPLOYMENT_SOFT_LINK=/home/ubuntu/java-app/latest
  - export JAVA_EXECUTABLE=/usr/lib/jvm/java-8-openjdk-amd64/bin/java

build-in-dev-build-agent(172.16.6.40):
  stage: build
  image: alpine
  only:
    - main
  tags:
    - local
  script:
    - ls
    - ./gradlew clean build -x test
    - ls
    - pwd

test-in-dev-build-agent(172.16.6.40):
  stage: test
  only:
    - main
  tags:
    - local
  script:
    - ls
    - ./gradlew clean test


deploy-in-dev(172.16.6.26):
  stage: deploy
  only:
    - main
  tags:
    - local
  script:
    - ./gradlew clean build -x test
    - cd build/libs
    - ssh ${REMOTE_USER}@${REMOTE_MACHINE_IP} "mkdir -p ${DEPLOYMENT_DIR}"
    - scp *.jar ${REMOTE_USER}@${REMOTE_MACHINE_IP}:${DEPLOYMENT_DIR}
    - id=`echo $(ssh ${REMOTE_USER}@${REMOTE_MACHINE_IP} "ps aux | grep java-app | grep -v grep" | awk '{print $2}')`
    - echo $id
    - ssh ${REMOTE_USER}@${REMOTE_MACHINE_IP} "kill -9 $id || echo 0"
    - ssh ${REMOTE_USER}@${REMOTE_MACHINE_IP} "rm -rf ${DEPLOYMENT_SOFT_LINK}; ln -s ${DEPLOYMENT_DIR} ${DEPLOYMENT_SOFT_LINK}"
    - ssh ${REMOTE_USER}@${REMOTE_MACHINE_IP} "cd ${DEPLOYMENT_SOFT_LINK} ; nohup ${JAVA_EXECUTABLE} -jar java-app-1.0-SNAPSHOT.jar > /dev/null 2>&1 &"
  after_script:
    - sleep 20
    - echo 'CICD Done '

```
