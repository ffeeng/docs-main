#!/usr/bin/expect

set host 172.xx.xx.xx
set dist /www/wwwroot/
set name muse-dev

spawn npm run build:dev
expect eof

puts "开始部署..."
puts "压缩文件夹..."
spawn tar -czf $name.tar.gz dist
expect eof

puts "开始上传文件"
spawn scp  $name.tar.gz root@$host:$dist

expect eof


puts "ssh登录..."
spawn ssh root@$host
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "*password:" { send "kugkiQ-8jizmy-jurvar\r" }
}
expect {
    "*#" { }
}
send "cd /www/wwwroot\r"
expect {
    "*#" { }
}
send "ls\r"
expect {
    "*#" { }
}
send "rm -rf $name\r"
expect {
    "*#" { }
}
send "tar -xzf $name.tar.gz\r"
expect {
    "*#" { }
}
send "mv dist $name\r"
expect {
    "*#" { }
}
puts "部署成功！"

interact






