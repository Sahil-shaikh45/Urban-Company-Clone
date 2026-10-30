@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup script for Windows, version 3.2.0
@REM
@REM Optional ENV vars
@REM   JAVA_HOME - Java installation directory
@REM   MAVEN_BATCH_ECHO - set to 'on' to enable the echoing of batch commands
@REM   MAVEN_BATCH_PAUSE - set to 'on' to wait for a key stroke before ending
@REM   MAVEN_OPTS - parameters passed to the Java VM when running Maven
@REM     e.g. to debug Maven itself, use
@REM       set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
@REM   MAVEN_SKIP_RC - flag to disable loading of mavenrc files
@REM ----------------------------------------------------------------------------

@IF "%MAVEN_BATCH_ECHO%" == "on"  ECHO %MAVEN_BATCH_ECHO%

@setlocal

set ERROR_CODE=0

@REM To isolate internal variables from possible wrapper users, use double underscores.
set "__MVNW_ARG_JAVA_HOME="
set "__MVNW_CHECK_JAVA_HOME=off"

@REM ==== START VALIDATION ====
if not "%JAVA_HOME%" == "" (
  if exist "%JAVA_HOME%\bin\java.exe" (
    set "__MVNW_ARG_JAVA_HOME=%JAVA_HOME%"
    set "__MVNW_CHECK_JAVA_HOME=on"
  )
)

if "%__MVNW_CHECK_JAVA_HOME%" == "off" (
  java -version >nul 2>&1
  if %ERRORLEVEL% neq 0 (
    echo.
    echo Error: JAVA_HOME is set to an invalid directory.
    echo JAVA_HOME = "%JAVA_HOME%"
    echo Please set the JAVA_HOME variable in your environment to match the
    echo location of your Java installation.
    echo.
    goto error
  )
)

@REM ==== END VALIDATION ====

@REM Find the project base directory, i.e. the directory that contains the folder ".mvn".
@REM Fallback to current working directory if not found.

set "MAVEN_PROJECTBASEDIR=%MAVEN_BASEDIR%"
if not "%MAVEN_PROJECTBASEDIR%" == "" goto endDetectBaseDir

set "EXEC_DIR=%CD%"
set "W_DIR=%CD%"
:findBaseDir
if exist "%W_DIR%\.mvn" (
  set "MAVEN_PROJECTBASEDIR=%W_DIR%"
  goto endDetectBaseDir
)
cd ..
if "%W_DIR%" == "%CD%" goto fallback
set "W_DIR=%CD%"
goto findBaseDir

:fallback
set "MAVEN_PROJECTBASEDIR=%EXEC_DIR%"

:endDetectBaseDir
cd "%EXEC_DIR%"

set "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_PROPERTIES=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.properties"
set "MAVEN_CONFIG_DIR=%MAVEN_PROJECTBASEDIR%\.mvn"

@REM Check for the existence of the wrapper jar
if exist "%WRAPPER_JAR%" goto run

@REM If the wrapper jar does not exist, download it
echo Downloading Maven Wrapper...
powershell -Command "& { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar', '%WRAPPER_JAR%') }"
if %ERRORLEVEL% neq 0 (
  echo.
  echo Error: Failed to download Maven Wrapper jar.
  echo.
  goto error
)

:run
set "MAVEN_OPTS=%MAVEN_OPTS% -Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%"

@REM Start the JVM and run the wrapper jar
if not "%__MVNW_ARG_JAVA_HOME%" == "" (
  "%__MVNW_ARG_JAVA_HOME%\bin\java.exe" %MAVEN_OPTS% -jar "%WRAPPER_JAR%" %*
) else (
  java %MAVEN_OPTS% -jar "%WRAPPER_JAR%" %*
)
if %ERRORLEVEL% neq 0 goto error
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%

if not "%MAVEN_SKIP_RC%" == "" goto skipRc
if exist "%USERPROFILE%\mavenrc_pre.bat" call "%USERPROFILE%\mavenrc_pre.bat"
if exist "%USERPROFILE%\mavenrc_post.bat" call "%USERPROFILE%\mavenrc_post.bat"
:skipRc

if "%MAVEN_BATCH_PAUSE%" == "on" pause

if "%MAVEN_TERMINATE_CMD%" == "on" exit %ERROR_CODE%

exit /B %ERROR_CODE%
