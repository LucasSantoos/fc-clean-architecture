import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = ProductFactory.create("a", "Product A", 5000);

const input = {
  id: product.id, 
  name: "Product A Update",
  price: 5000
};

describe("Test update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        await productRepository.create(product as Product);
        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
})