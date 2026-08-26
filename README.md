 Pra começar a rodar tudo no local, basta fazer o git clone desse repo, ou abaixar o .zip e depois extrair.

1. Após o download, localize (de preferencia no terminal) o diretório jogos_teste/jogos/.
2. localizado o diretório, execute o comando

# docker-compose up -d

3. para conferir se o docker subiu certinho execute:

# docker ps

4. após isso acesse no navegador:
# http://localhost:4780

 é para tudo estar funcionando ☑️


 Se seu objetivo é rodar em outras máquinas, também é possível, só será necessário fazer algumas alterações no redirecionamento dos botões,
 pra isso seria necessário substituir http://localhost:4780 por http://{ip_da_máquina_que_roda_o_docker}:4780 de preferência deixe sua máquina com um ip fixo 😃
 e após alterar o código para o Ip da sua máquina, será possível acessar de qualquer dispositivo que estiver na rede local, ou em uma vpn que o "ligue" a rede local.
