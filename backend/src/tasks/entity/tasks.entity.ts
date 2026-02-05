import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn,Entity } from "typeorm";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column({type: 'text'})
    description: string;
    @Column({type: 'date', default: () => 'CURRENT_DATE'})
    dueDate: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}