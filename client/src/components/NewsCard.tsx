import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type News } from "@shared/schema";
import { format } from "date-fns";

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="object-cover w-full h-full"
          />
        </div>
      </CardContent>
      <CardHeader className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {format(new Date(news.date), "MMMM d, yyyy")}
        </p>
        <h3 className="font-semibold text-lg">{news.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{news.content}</p>
      </CardHeader>
    </Card>
  );
}
