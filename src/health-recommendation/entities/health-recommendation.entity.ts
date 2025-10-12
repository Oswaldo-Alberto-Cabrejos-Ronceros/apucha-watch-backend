import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HealthConditionRecommendation } from 'src/health-condition-recommendation/entities/health-condition-recommendation.entity';

@Entity({ name: 'health_recommendations' })
export class HealthRecommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => HealthConditionRecommendation,
    (healthConditionRecommendation) =>
      healthConditionRecommendation.healthRecommendation,
  )
  healthConditionRecommendations: HealthConditionRecommendation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
