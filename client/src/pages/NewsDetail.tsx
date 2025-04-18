import { useQuery } from "@tanstack/react-query";
import { type News } from "@shared/schema";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NewsDetail() {
  const [, params] = useRoute("/news/:id");
  const newsId = params?.id;

  const { data: news, isLoading } = useQuery<News>({
    queryKey: [`/api/news/${newsId}`],
    enabled: !!newsId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 mt-20">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container mx-auto p-4 mt-20">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy Tin tức</h1>
            <p className="text-muted-foreground mb-4">
              Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Link href="/news">
              <Button>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Quay lại Tin tức
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 my-20">
      <Link href="/news">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Quay lại Tin tức
        </Button>
      </Link>

      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={news.image}
              alt={news.title}
              className="w-full"
            />
          </div>
        </CardContent>
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {format(new Date(news.date), "MMMM d, yyyy")}
            </p>
            <h1 className="text-3xl font-bold">{news.title}</h1>
          </div>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed" dangerouslySetInnerHTML={{__html: news.content}}></p>
        </CardHeader>
      </Card>
    </div>
  );
}
