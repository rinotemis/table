DELETE FROM `demo`.`test` WHERE (`id` = 2);set @i := 0; update `demo`.`test` set id = (@i:=@i+1); select * from demo.test;