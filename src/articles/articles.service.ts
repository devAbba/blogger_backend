import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import  { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto, userId: string) {
    createArticleDto.authorId = userId;
    return this.prisma.article.create({ data: createArticleDto });
  }

  findAll() {
    return this.prisma.article.findMany({ 
      where: { published: true },
      include: {
        author: true
      },
    });
  }

  findOne(id: string) {
    return this.prisma.article.findUnique({ 
      where: {id},
      include: {
        author: true,
      }
    });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false }});
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {id},
      data: updateArticleDto
    });
  }

  remove(id: string) {
    return this.prisma.article.delete({ where: {id} });
  }
}
