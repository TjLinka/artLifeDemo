docker rm --force artlife_distr_front_t
docker build . -t artlife_distr_front_t
docker run -d -v /etc/localtime:/etc/localtime:ro -p 9057:80 --restart=always --name artlife_distr_front_t artlife_distr_front_t
