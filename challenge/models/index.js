const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://yourusername:yourpassword@localhost:5432/mydatabase');

const Author = sequelize.define('Author', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false }
});

const Book = sequelize.define('Book', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  publicationYear: { type: DataTypes.INTEGER, allowNull: false },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Author,
      key: 'id'
    }
  }
});

Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });

sequelize.sync();

module.exports = { Author, Book, sequelize };
