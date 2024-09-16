import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNewsInput } from './dto/create-news.input';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepo: Repository<News>,
  ) {}

  async create(createNewsInput: CreateNewsInput) {
    const news = this.newsRepo.create(createNewsInput);
    return await this.newsRepo.save(news);
  }

  findAll() {
    return this.newsRepo.find({
      order: {
        publishedAt: 'DESC',
      },
    });
  }

  findByLanguage(language: string) {
    return this.newsRepo.find({
      where: { language },
      order: {
        publishedAt: 'DESC',
      },
    });
  }

  async findById(id: number): Promise<News> {
    const news = await this.newsRepo.findOneBy({ id });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(
    id: number,
    updateNewsInput: Partial<CreateNewsInput>,
  ): Promise<News> {
    const news = await this.newsRepo.preload({
      id,
      ...updateNewsInput,
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return this.newsRepo.save(news);
  }
}
