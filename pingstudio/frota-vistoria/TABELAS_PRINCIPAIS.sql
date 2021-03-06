-- DOMAINS

CREATE DOMAIN DO_NOME
 AS Varchar(60)
 COLLATE ISO8859_1;
 
 CREATE DOMAIN DO_NUMERO
 AS Numeric(18,4);
 
 CREATE DOMAIN DO_ALFANUMERICO
 AS Varchar(256)
 COLLATE ISO8859_1;

-- LISTA_VERIFICACAO
CREATE SEQUENCE SQ_LISTA_VERIFICACAO_ID;

CREATE TABLE LISTA_VERIFICACAO
(
  ID DO_IDENTIFICADOR NOT NULL,
  NOME DO_NOME NOT NULL,
  NATUREZA DO_ENUMERACAO DEFAULT 0 NOT NULL,
  EXCLUIDO DO_LOGICO DEFAULT 0 NOT NULL,
  REGISTRO DO_DATAHORA NOT NULL,
  USUARIO DO_IDENTIFICADOR NOT NULL,
  ATUALIZACAO DO_DATAHORA NOT NULL,
  ATUALIZADOR DO_IDENTIFICADOR NOT NULL,
  VERSAO DO_SEQUENCIA NOT NULL,
  UUID DO_UUID NOT NULL,
  CONSTRAINT PK_LISTA_VERIFICACAO PRIMARY KEY (ID)
);
GRANT DELETE, INSERT, REFERENCES, SELECT, UPDATE
 ON LISTA_VERIFICACAO TO  SYSDBA WITH GRANT OPTION;
GRANT DELETE, INSERT, REFERENCES, SELECT, UPDATE
 ON LISTA_VERIFICACAO TO ROLE SYSTEM;
 
SET TERM ^ ;

CREATE TRIGGER TR_LISTA_VERIFICACAO_DEF FOR LISTA_VERIFICACAO
ACTIVE BEFORE INSERT OR UPDATE POSITION 0
AS 
BEGIN 
	new.ATUALIZACAO = current_timestamp;
  if (new.ATUALIZADOR is null) then
    new.ATUALIZADOR=(select UUID from COLABORADOR where ID=0);
  if (inserting) then
  begin 
    if (new.id is null) then
        new.id = gen_id(SQ_LISTA_VERIFICACAO_ID, 1);
    if (new.UUID is null) then 
        new.UUID = (select UUID from COLABORADOR where ID=new.ID);
    new.REGISTRO = new.ATUALIZACAO;
    new.USUARIO = new.ATUALIZADOR;
    new.VERSAO = 0;
  end else
  begin
    new.UUID = old.UUID;
    new.REGISTRO = old.REGISTRO;
    new.USUARIO = old.USUARIO;
    new.VERSAO = old.VERSAO + 1;
  end
END^

SET TERM ; ^ 

-- END LISTA_VERIFICACAO

-- ITEM_VERIFICACAO

CREATE SEQUENCE SQ_ITEM_VERIFICACAO_ID;

CREATE TABLE ITEM_VERIFICACAO
(
  ID DO_IDENTIFICADOR NOT NULL,
  LISTA DO_IDENTIFICADOR NOT NULL,
  NOME DO_NOME NOT NULL,
  TIPO DO_ENUMERACAO DEFAULT 0 NOT NULL,
  GRUPO DO_IDENTIFICADOR,
  PROCEDIMENTOS DO_TEXTO,
  OBSERVACOES DO_TEXTO,
  EXCLUIDO DO_LOGICO DEFAULT 0 NOT NULL,
  REGISTRO DO_DATAHORA NOT NULL,
  USUARIO DO_IDENTIFICADOR NOT NULL,
  ATUALIZACAO DO_DATAHORA NOT NULL,
  ATUALIZADOR DO_IDENTIFICADOR NOT NULL,
  VERSAO DO_SEQUENCIA NOT NULL,
  UUID DO_UUID NOT NULL,
  CONSTRAINT PK_ITEM_VERIFICACAO PRIMARY KEY (ID)
);
ALTER TABLE ITEM_VERIFICACAO ADD CONSTRAINT FK_ITEM_VERIFICACAO_LISTA_VERIF
  FOREIGN KEY (LISTA) REFERENCES LISTA_VERIFICACAO (ID);
GRANT DELETE, INSERT, REFERENCES, SELECT, UPDATE
 ON ITEM_VERIFICACAO TO  SYSDBA WITH GRANT OPTION;
GRANT DELETE, INSERT, REFERENCES, SELECT, UPDATE
 ON ITEM_VERIFICACAO TO ROLE SYSTEM;
 
 SET TERM ^ ;

CREATE TRIGGER TR_ITEM_VERIFICACAO_DEF FOR ITEM_VERIFICACAO
ACTIVE BEFORE INSERT POSITION 0
AS 
BEGIN 
new.ATUALIZACAO = current_timestamp;
  new.ATUALIZADOR = 0;
  if (inserting) then
  begin
    if (new.ID is null) then
      new.ID = next value for SQ_ITEM_VERIFICACAO_ID;
    if (new.UUID is null) then
      new.UUID = (select UUID from SP_CREATEUUID);
    new.REGISTRO = new.ATUALIZACAO;
    new.USUARIO = new.ATUALIZADOR;
    new.VERSAO = 0;
  end 
END^

SET TERM ; ^ 

-- END ITEM_VERIFICACAO

-- VISTORIA

CREATE SEQUENCE SQ_VISTORIA_ID;
 
 CREATE TABLE VISTORIA
 (
  ID DO_IDENTIFICADOR NOT NULL,
  LISTA DO_IDENTIFICADOR NOT NULL,
  ATIVO DO_IDENTIFICADOR NOT NULL,
  DATA DO_DATA NOT NULL,
  HORA DO_HORA,
  QUILOMETRAGEM DO_NUMERO,
  VISTORIADOR DO_IDENTIFICADOR NOT NULL,
  SITUACAO DO_ENUMERACAO DEFAULT 0 NOT NULL,
  EXCLUIDO DO_LOGICO DEFAULT 0 NOT NULL,
  REGISTRO DO_DATAHORA NOT NULL,
  USUARIO DO_IDENTIFICADOR NOT NULL,
  ATUALIZACAO DO_DATAHORA NOT NULL,
  ATUALIZADOR DO_IDENTIFICADOR NOT NULL,
  VERSAO DO_SEQUENCIA NOT NULL,
  UUID DO_UUID NOT NULL,
  ASSINATURA DO_TEXTO,
  CONSTRAINT PK_VISTORIA PRIMARY KEY (ID),
  CONSTRAINT UC_VISTORIA UNIQUE (UUID)
);
GRANT DELETE, INSERT, REFERENCES, SELECT, UPDATE
 ON VISTORIA TO  SYSDBA WITH GRANT OPTION;
GRANT DELETE, INSERT, REFERENCES, SELECT, UPDATE
 ON VISTORIA TO ROLE SYSTEM;

 SET TERM ^ ;

CREATE TRIGGER TR_VISTORIA_DEF FOR VISTORIA
ACTIVE BEFORE INSERT OR UPDATE POSITION 0
AS 
BEGIN 
	new.atualizacao = current_timestamp;
  if (inserting) then
  begin
     IF (NEW.ID IS NULL or new.ID = 0) THEN
        NEW.ID = NEXT VALUE FOR sq_VISTORIA_ID;
    new.registro = new.atualizacao;
    new.usuario = new.atualizador;
    NEW.VERSAO = 1;
    if (new.UUID is null or new.UUID = '') then
      new.UUID=(select UUID from SP_CREATEUUID);      
  end else
  begin
    new.registro = old.registro;
    new.usuario = old.usuario;
    NEW.VERSAO = OLD.VERSAO + 1;
  end  
END^

SET TERM ; ^ 

-- END VISTORIA

-- RESULTADO_VISTORIA
 
CREATE SEQUENCE SQ_RESULTADO_VISTORIA_ID;

 CREATE TABLE RESULTADO_VISTORIA
(
  ID DO_IDENTIFICADOR NOT NULL,
  VISTORIA DO_IDENTIFICADOR NOT NULL,
  ITEM DO_IDENTIFICADOR NOT NULL,
  VALOR DO_ALFANUMERICO,
  INFORMACOES DO_TEXTO,
  EXCLUIDO DO_LOGICO DEFAULT 0 NOT NULL,
  REGISTRO DO_DATAHORA NOT NULL,
  USUARIO DO_IDENTIFICADOR NOT NULL,
  ATUALIZACAO DO_DATAHORA NOT NULL,
  ATUALIZADOR DO_IDENTIFICADOR NOT NULL,
  VERSAO DO_SEQUENCIA NOT NULL,
  UUID DO_UUID NOT NULL,
  CONSTRAINT PK_RESULTADO_VISTORIA PRIMARY KEY (ID),
  CONSTRAINT UC_RESULTADO_VISTORIA UNIQUE (UUID)
);
GRANT DELETE, INSERT, REFERENCES, SELECT, UPDATE
 ON RESULTADO_VISTORIA TO  SYSDBA WITH GRANT OPTION;
GRANT DELETE, INSERT, REFERENCES, SELECT, UPDATE
 ON RESULTADO_VISTORIA TO ROLE SYSTEM;
 
 SET TERM ^ ;

CREATE TRIGGER TR_RESULTADO_VISTORIA_DEF FOR RESULTADO_VISTORIA
ACTIVE BEFORE INSERT OR UPDATE POSITION 0
AS 
BEGIN 
  new.atualizacao = current_timestamp;
  if (inserting) then
  begin
    IF (NEW.ID IS NULL or new.ID = 0) THEN
        NEW.ID = NEXT VALUE FOR SQ_RESULTADO_VISTORIA_ID;
    if (new.UUID is null or new.UUID = '') then
        new.UUID=(select UUID from SP_CREATEUUID);      
    NEW.VERSAO = 1;
    new.registro = new.atualizacao;
    new.usuario = new.atualizador;
  end else
  begin
    new.registro = old.registro;
    new.usuario = old.usuario;
    NEW.VERSAO = OLD.VERSAO + 1;
  end  END^

SET TERM ; ^ 

-- END RESULTADO_VISTORIA

-- VISTORIA_RECURSO

CREATE SEQUENCE VISTORIA_RECURSO_ID;

CREATE TABLE VISTORIA_RECURSO(
    ID DM_IDENTIFIER NOT NULL,
    REFERENCIA DM_IDENTIFIER NOT NULL,
	CONTEUDO DM_BINARY NOT NULL,
	EXCLUIDO DM_BOOLEAN
);

SET TERM ^ ;
CREATE TRIGGER VISTORIA_RECURSO_DEF FOR VISTORIA_RECURSO 
	ACTIVE BEFORE INSERT POSITION 0 
AS
BEGIN
	NEW.ID = GEN_ID(VISTORIA_RECURSO_ID, 1);
END^
SET TERM ; ^
-- END VISTORIA_RECURSO
