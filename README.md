
#安装证书工具：
curl https://get.acme.sh | sh; apt install socat -y || yum install socat -y; ~/.acme.sh/acme.sh --set-default-ca --server letsencrypt

#三种方式任选其中一种，申请失败则更换方式
#申请证书方式1：
~/.acme.sh/acme.sh  --issue -d 43.155.20.143 --standalone -k ec-256 --force --insecure
#申请证书方式2：
~/.acme.sh/acme.sh --register-account -m "${RANDOM}@chacuo.net" --server buypass --force --insecure && ~/.acme.sh/acme.sh  --issue -d 你的域名 --standalone -k ec-256 --force --insecure --server buypass
#申请证书方式3：
~/.acme.sh/acme.sh --register-account -m "${RANDOM}@chacuo.net" --server zerossl --force --insecure && ~/.acme.sh/acme.sh  --issue -d 你的域名 --standalone -k ec-256 --force --insecure --server zerossl

#安装证书：
~/.acme.sh/acme.sh --install-cert -d 你的域名 --ecc --key-file /etc/x-ui/server.key --fullchain-file /etc/x-ui/server.crt


AS132203
curl https://get.acme.sh | sh;  yum install socat -y; ~/.acme.sh/acme.sh --set-default-ca --server letsencrypt

