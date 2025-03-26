
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Video } from "@shared/schema";

interface VideoCardProps {
    video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
                <div className="aspect-[9/16] relative overflow-hidden">
                    <iframe
                        src={video.url}
                        width="100%"
                        height="100%"
                        scrolling="no"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                </div>
            </CardContent>
            <CardHeader className="space-y-2">
                <p className="text-sm text-muted-foreground whitespace-pre-line"
                   dangerouslySetInnerHTML={{__html: video.description}}></p>
            </CardHeader>
        </Card>
    );
}
