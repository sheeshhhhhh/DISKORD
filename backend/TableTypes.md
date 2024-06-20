auth_type is an enum type that containes a ['Local', 'Oauth']


 do later: put and authentication middle ware....

 get all member of the server 
 SELECT u.id, u.username
FROM users u
JOIN server_members sm ON u.id = sm.user_id
WHERE sm.server_id = 1;
https://chatgpt.com/c/dd14d419-2595-419e-82ed-d496417d7620


junction table (or associative table)