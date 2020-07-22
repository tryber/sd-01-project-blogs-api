const UserRepository = require('../../infrastructure/user/UserRepository');
const userController = require('./userController');

describe('Controllers', () => {
  describe('Get User by Id', () => {

    // test('When requesting a User with ID 1, should return a single user with id 1 and a 200', async () => {
    //   // Arrange
    //   const mockData = {
    //     id: 1,
    //     displayName: 'Leonardo',
    //     email: 'leo@test.com',
    //     image: 'http://localhost:3000/Leonardo.png',
    //   };

    //   const getOneSpy = jest
    //     .spyOn(UserRepository.prototype, 'getById')
    //     .mockReturnValueOnce(mockData);

    //   const mockReq = {
    //     params: {
    //       id: 1,
    //     },
    //   };

    //   const mockRes = { status: jest.fn(), json: jest.fn() };

    //   // Act
    //   await userController.detailUser(mockReq, mockRes);

    //   // Assert
    //   expect(getOneSpy).toBeCalledTimes(1);
    //   expect(mockRes.status).toBeCalledWith(200);
    //   expect(mockRes.json).toBeCalledWith(mockData);
    //   getOneSpy.mockRestore();
    // });

    test('When requesting a User with an unexisting id, should return a 404 and an error message', async () => {
      // Arrange
      const mockData = null;

      const getOneSpy = jest
        .spyOn(UserRepository.prototype, 'getById')
        .mockReturnValueOnce(mockData);

      const mockReq = {
        params: {
          id: 80,
        },
      };

      const mockRes = { status: jest.fn(), json: jest.fn() };

      // Act
      await userController.detailUser(mockReq, mockRes);

      // Assert
      expect(getOneSpy).toBeCalledTimes(1);
      // expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({
        message: 'Usuário não encontrado',
      });
      getOneSpy.mockRestore();
    });

  //   test('When something went wrong while calling the model, should return a 500 and an error message', async () => {
  //     // Arrange
  //     const getOneSpy = jest
  //       .spyOn(Pokedex.prototype, 'getPokemonById')
  //       .mockImplementation(() => {
  //         throw new Error();
  //       });

  //     const mockReq = {
  //       params: {
  //         id: 80,
  //       },
  //     };

  //     const mockRes = { status: jest.fn(), send: jest.fn() };

  //     // Act
  //     await pokedexController.getPokemonById(mockReq, mockRes);

  //     // Assert
  //     expect(getOneSpy).toBeCalledTimes(1);
  //     expect(mockRes.status).toBeCalledWith(500);
  //     expect(mockRes.send).toBeCalledWith({ message: 'Algo deu errado' });
  //     getOneSpy.mockRestore();
  //   });

  });
});
