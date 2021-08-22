# System

## Nginx

Installation
```
apt-get install nginx
```

Créer symlinks
```
ln -s /home/sgnw/system/nginx/sgnw.conf /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/sgnw.conf /etc/nginx/sites-enabled/
```

Test de la configuration
```
nginx -t
```

Executer le service
```
service nginx start
service nginx restart
service nginx stop
```

## PM2

Installation
```
npm install -g pm2
```

Lancement
```
pm2 start npm --name sgnw -- start
```

Hot reload (sans downtime)
```
pm2 reload sgnw
```

Listing et monitoring
```
pm2 ls
pm2 monit
pm2 show sgnw
```

Restart / Stop / Delete
```
pm2 restart sgnw
pm2 stop sgnw
pm2 delete sgnw
```

## Telegraf

```
ln -s /home/sgnw/system/telegraf/sgnw.conf /etc/telegraf/telegraf.d/
```
