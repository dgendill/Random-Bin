#!/bin/bash
mysql -u username -h site.server.com -p

# http://wpbeaches.com/updating-wordpress-mysql-database-after-moving-to-a-new-url/

# SELECT table_schema "DB Name", Round(Sum(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB" FROM information_schema.tables GROUP BY table_schema; 

# USE databasename
# SELECT * FROM wp_options WHERE option_name = 'home' OR option_name = 'siteurl';
# SELECT COUNT(*) FROM wp_posts WHERE guid like '%http://www.oldurl%';
# SELECT COUNT(*) FROM wp_posts WHERE post_content like '%http://www.oldurl%';
# SELECT COUNT(*) FROM wp_postmeta WHERE meta_value like '%http://www.oldurl%';

# UPDATE wp_options SET option_value = replace(option_value, 'http://www.oldurl', 'http://www.newurl') WHERE option_name = 'home' OR option_name = 'siteurl';

# UPDATE wp_posts SET guid = replace(guid, 'http://www.oldurl','http://www.newurl');

# UPDATE wp_posts SET post_content = replace(post_content, 'http://www.oldurl', 'http://www.newurl');

# UPDATE wp_postmeta SET meta_value = replace(meta_value,'http://www.oldurl','http://www.newurl');
