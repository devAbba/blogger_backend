import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, ParseUUIDPipe} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity'
import { JwtAuthGaurd } from 'src/auth/jwt-auth.guard';
import { User } from '../users/decorators/user.decorator';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto, @User('id', new ParseUUIDPipe()) id: string ) {
    return new ArticleEntity(await this.articlesService.create(createArticleDto, id));
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map(article => new ArticleEntity(article))
  }

  @Get('drafts')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts() {
    const drafts = await this.articlesService.findDrafts();
    return drafts.map(draft => new ArticleEntity(draft))
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const article = await this.articlesService.findOne(id);
    
    if (!article) throw new NotFoundException("record does not exist");

    return new ArticleEntity(article);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return new ArticleEntity(await this.articlesService.update(id, updateArticleDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return new ArticleEntity(await this.articlesService.remove(id));
  }
}
