CREATE USER 'exporter'@'%' IDENTIFIED BY 'boostcamp37' WITH MAX_USER_CONNECTIONS 3;
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'exporter'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'cloud_canvas_user'@'%';
CREATE USER 'ping_user'@'localhost' IDENTIFIED BY '';
GRANT USAGE ON *.* TO 'ping_user'@'localhost';
FLUSH PRIVILEGES;