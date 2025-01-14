import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Mutation(() => News)
  createNews(@Args('createNewsInput') createNewsInput: CreateNewsInput) {
    return this.newsService.create(createNewsInput);
  }

  @Query(() => [News], { name: 'news' })
  findAll() {
    return this.newsService.findAll();
  }

  @Query(() => [News], { name: 'newsByLanguage' })
  findByLanguage(@Args('language') language: string) {
    return this.newsService.findByLanguage(language);
  }

  @Query(() => News, { name: 'newsById' })
  findById(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.findById(id);
  }

  @Mutation(() => News)
  updateNews(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateNewsInput') updateNewsInput: UpdateNewsInput,
  ) {
    return this.newsService.update(id, updateNewsInput);
  }
}
