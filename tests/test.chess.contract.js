describe('ChessContract', () => {

  let address = '', accounts;

  let player1, player2, gameId = 0, fen, chess, fee = 10;

  const assertBoardProperties = obj => {
    chai.should();
    obj.should.be.a('object');
    obj.should.haveOwnProperty('getBoard');
    obj.should.haveOwnProperty('registerPlayer');
    obj.should.haveOwnProperty('createGame');
    obj.should.haveOwnProperty('startGame');
    obj.should.haveOwnProperty('move');
    obj.should.haveOwnProperty('getPlayer');
    obj.should.haveOwnProperty('getActivePlayers');
    obj.should.haveOwnProperty('setPlayerStatus');
  };

  describe('Upload, deploy and get contract', async () => {

    it('Should have accounts', (done) => {
      webclient.getAccounts().then(result => {
        accounts = result;
        chai.assert.ok(accounts.length > 1, 'There are accounts');
        done();
      }).catch(done);
    });

    it('Should return correct abi', done => {
      webclient.upload(ChessGame).then(result => {
        assertBoardProperties(result.abi);
        done();
      }).catch(done);

    });

    it('ChessGame should be in contracts', async () => {
      let result = await webclient.getContracts();
      chai.expect(result).to.deep.include.members([{name : 'ChessGame'}]);
    });

    it('Should deploy ChessGame and return an address', (done) => {

      webclient.deploy(accounts[0], '1234', 'ChessGame').then(result => {
        const expect = chai.expect;
        expect(result.deployed).to.equal(true, 'Contract is deployed');
        expect(result.owner).to.equal(accounts[0], 'Owner correctly set');
        address = result.address;
        chai.assert.ok(address);
        done();
      }).catch(done);

    }).timeout(5000);

    it('Should get contract from address', async () => {
      player1 = await webclient.getContract(address, accounts[0]);
      chai.assert.ok(player1);
      player2 = await webclient.getContract(address, accounts[1]);
      chai.assert.ok(player2);
      assertBoardProperties(player1);
      assertBoardProperties(player2);
    });
  });

  describe('Play chess', () => {

    it('Should register players', (done) => {
      chai.assert.ok(player1);
      const assert = chai.assert;

      let calls = 0;

      player1.onRegisterPlayer = async (result, options) => {
        assert.isOk(result, 'Result is an object');

        if (calls < 2) {
          options.params.should.include('Player1');
        }
        else {
          options.params.should.include('Player2');
        }

        calls++;

        if (calls === 4) {
          result = await player2.registerPlayer('Player2').catch(result => {
            result.message.result.log.should.equal('You are already registered with this account');
            done();
          });
          assert.isNotOk(result);
        }
      };

      player1.registerPlayer('Player1');
      player2.registerPlayer('Player2');
    }).timeout(5000);

    it('Should create game', (done) => {

      let calls = 0;
      player1.onCreateGame = (result) => {
        calls++;
        if (calls === 2)
          done();
      };

      player1.createGame(fee, 'Welcome to this game').then(result => {
        const data = result.data;
        data.creator.should.equal(accounts[0]);
        data.fee.should.equal(fee);
        data.status.should.equal('open');
        data.messages.should.deep.include({from: 'Player1', message : 'Welcome to this game' });
        gameId = data.id;
        gameId.should.be.greaterThan(0);
      }).catch(done);
    });

    it('Player1 wants to start the game', done => {
      player1.startGame(gameId, accounts[0], accounts[1], new Date().getTime()).then(result => {
        result.should.equal('foo');//may not happen
      }).catch(result => {
        result.message.result.log.should.equal('Creator can not start the game');
        done();
      });
    });

    it('Player2 starts the game', (done) => {

      let calls = 0;
      player1.onStartGame = async (result, options) => {
        calls++;

        if (calls === 2) {
          result.fen.should.equal('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
          fen = result.fen;
          const board = await player1.getBoard(gameId);
          board.should.exist;
          done();
        }
      };

      player2.startGame(gameId, accounts[0], accounts[1], new Date().getTime()).then(result => {
        const data = result.data;
        data.white.should.equal(accounts[0]);
        data.black.should.equal(accounts[1]);
        data.status.should.equal('started');
        data.turn.should.equal(data.white);
      }).catch(result => {
        result.should.equal('foo');//may not happen
        done();
      });
    }).timeout(5000);

    it('Play game', done => {

      let calls = 0, lastResult;

      const makeMove = async fen => {
        chess = new Chess(fen);
        console.log(chess.ascii());

        const player = chess.turn() === 'w' ? player1 : player2;

        if (!chess.game_over()) {
          const moves = chess.moves(),
            move = moves[Math.floor(Math.random() * moves.length)];

          calls = 0;
          lastResult = await player.move(gameId, move);
        } else {
          const result = lastResult.data;

          const whitePlayer = await player1.getPlayer();
          const blackPlayer = await player2.getPlayer();

          const game = await player1.getGame(gameId);
          console.log(game);

          if (chess.in_checkmate()) {
            result.status.should.equal('win');

            const winner = result.move.color === 'w' ? whitePlayer : blackPlayer;
            const loser = result.move.color === 'b' ? whitePlayer : blackPlayer;
            winner.won.should.equal(1);
            loser.lost.should.equal(1);

            winner.coins.should.equal(110);
            loser.coins.should.equal(90);

            console.log('winner is ');
            console.log(winner);

          } else {

            whitePlayer.coins.should.equal(100);
            blackPlayer.coins.should.equal(100);

            whitePlayer.draw.should.equal(1);
            blackPlayer.draw.should.equal(1);

            if (chess.in_draw())
              result.status.should.equal('draw');
          }

          done();
        }
      };

      player1.onMove = (result, options) => {
        calls++;

        if (calls === 2) {
          makeMove(result.fen);
        }
      };

      makeMove(fen);

    }).timeout(500000)

  });
});
