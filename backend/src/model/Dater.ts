import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "dater",
    timestamps: false
})

export class Dater extends Model<Dater>{

    @Column({
        type: DataType.STRING,
        primaryKey: true,
        // autoIncrement: true,
        field: "dater_id",
      })
      dater_id!: string;

    @Column({
        type: DataType.STRING(100),
        field: "first_name",
    })
    first_name!: string;
    
    @Column({
        type: DataType.STRING(100),
        field: "last_name",
    })
    last_name!: string;

    @Column({
        type: DataType.STRING(100),
        field: "gender",
    })
    gender!: string;

    @Column({
        type: DataType.STRING(300),
        field: "dietary_restrictions",
    })
    dietary_restrictions!: string;

    @Column({
        type: DataType.STRING(300),
        field: "availabilities",
    })
    availabilities!: string;

    @Column({
        type: DataType.STRING(300),
        field: "images",
    })
    images!: string;
}