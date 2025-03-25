import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type Product, type News, type InsertProduct, type InsertNews } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox} from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { loginAdmin } from "@/lib/admin-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Admin() {
    const [, setLocation] = useLocation();
    const { toast } = useToast();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editingNews, setEditingNews] = useState<News | null>(null);

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/admin/auth-status");
                const data = await res.json();
                setIsAuthenticated(data.isAuthenticated);
            } catch (error) {
                console.error("Failed to check auth status:", error);
            }
        };
        checkAuth();
    }, []);

    // Handle login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginAdmin(username, password);
            setIsAuthenticated(true);
            toast({
                title: "Thông báo",
                description: "Đăng nhập thành cônng",
            });
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Thông tin đăng nhập không chính xác",
                variant: "destructive",
            });
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            setIsAuthenticated(false);
            setUsername("");
            setPassword("");
            toast({
                title: "Thông báo",
                description: "Đăng xuất thành công",
            });
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Đăng xuất thất bại",
                variant: "destructive",
            });
        }
    };

    // Products management
    const { data: products } = useQuery<Product[]>({
        queryKey: ["/api/products"],
        enabled: isAuthenticated,
    });

    const createProductMutation = useMutation({
        mutationFn: async (product: InsertProduct) => {
            const res = await apiRequest("POST", "/api/products", {
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/products"] });
            toast({ title: "Thông báo", description: "Thêm sản phẩm thành công" });
        },
    });

    const updateProductMutation = useMutation({
        mutationFn: async ({ id, product }: { id: number; product: Partial<InsertProduct> }) => {
            const res = await apiRequest("PUT", `/api/products/${id}`, {
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/products"] });
            toast({ title: "Thông báo", description: "Cập nhật sản phẩm thành công" });
            setEditingProduct(null);
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (id: number) => {
            await apiRequest("DELETE", `/api/products/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/products"] });
            toast({ title: "Thông báo", description: "Xóa sản phẩm thành công" });
        },
    });

    // News management
    const { data: news } = useQuery<News[]>({
        queryKey: ["/api/news"],
        enabled: isAuthenticated,
    });

    const createNewsMutation = useMutation({
        mutationFn: async (news: InsertNews) => {
            const res = await apiRequest("POST", "/api/news", {
                body: JSON.stringify(news),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/news"] });
            toast({ title: "Thông báo", description: "Thêm tin tức thành công" });
        },
    });

    const updateNewsMutation = useMutation({
        mutationFn: async ({ id, news }: { id: number; news: Partial<InsertNews> }) => {
            const res = await apiRequest("PUT", `/api/news/${id}`, {
                body: JSON.stringify(news),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/news"] });
            toast({ title: "Thông báo", description: "Cập nhật tin tức thành công" });
            setEditingNews(null);
        },
    });

    const deleteNewsMutation = useMutation({
        mutationFn: async (id: number) => {
            await apiRequest("DELETE", `/api/news/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/news"] });
            toast({ title: "Thông báo", description: "Xóa tin tức thành công" });
        },
    });

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 pt-40 pb-20 max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Đăng nhập quản trị</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Tài khoản"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <Input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Đăng nhập
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Bảng điều khiển quản trị</h1>
                <Button
                    variant="outline"
                    onClick={handleLogout}
                >
                    Đăng xuất
                </Button>
            </div>

            <Tabs defaultValue="products">
                <TabsList className="mb-8">
                    <TabsTrigger value="products">Sản phẩm</TabsTrigger>
                    <TabsTrigger value="news">Tin tức</TabsTrigger>
                </TabsList>

                <TabsContent value="products">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quản lý sản phẩm</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {/* Add Product Form */}
                                {!editingProduct ? (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.currentTarget);
                                            console.log(formData.get("featured"));
                                            createProductMutation.mutate({
                                                name: formData.get("name") as string,
                                                description: formData.get("description") as string,
                                                price: '',
                                                category: formData.get("category") as string,
                                                image: formData.get("image") as string,
                                                featured: formData.get("featured") === "on",
                                            });
                                            e.currentTarget.reset();
                                        }}
                                        className="space-y-4"
                                    >
                                        <Input name="name" defaultValue="" placeholder="Tên sản phẩm" required />
                                        <Textarea name="description" defaultValue="" placeholder="Mô tả" required />
                                        <Input name="category" defaultValue="" placeholder="Hạng mục" />
                                        <Input name="image" defaultValue="" placeholder="Đường dẫn ảnh" required />
                                        <div className="flex items-center gap-2">
                                            {/*<input type="checkbox" name="featured" defaultChecked={false} />*/}
                                            <Checkbox name="featured" />
                                            <label htmlFor="featured">Sản phẩm nổi bật</label>
                                        </div>
                                        <Button type="submit">Thêm mới</Button>
                                    </form>
                                ) : (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.currentTarget);
                                            updateProductMutation.mutate({
                                                id: editingProduct.id,
                                                product: {
                                                    name: formData.get("name") as string,
                                                    description: formData.get("description") as string,
                                                    price: '',
                                                    category: formData.get("category") as string,
                                                    featured: editingProduct.featured as boolean,
                                                    image: formData.get("image") as string
                                                },
                                            });
                                        }}
                                        className="space-y-4"
                                    >
                                        <Input name="name" defaultValue={editingProduct.name} required />
                                        <Textarea name="description" defaultValue={editingProduct.description} required />
                                        <Input name="category" defaultValue={editingProduct.category} />
                                        <Input name="image" defaultValue={editingProduct.image} required />
                                        <div className="flex items-center gap-2">
                                            {/*<input type="checkbox" name="featured" defaultChecked={editingProduct.featured} />*/}
                                            <Checkbox
                                                checked={editingProduct?.featured || false}
                                                onCheckedChange={(checked) => setEditingProduct(prev => prev ? { ...prev, featured: checked as boolean } : null)}
                                            />
                                            <label htmlFor="featured">Sản phẩm nổi bật</label>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button type="submit">Cập nhật</Button>
                                            <Button type="button" variant="outline" onClick={() => {
                                                const emptyProduct = {
                                                    ...editingProduct,
                                                    name: '',
                                                    description: '',
                                                    price: '',
                                                    category: '',
                                                    featured: false,
                                                    image: '',
                                                };
                                                setEditingProduct(emptyProduct);
                                                setTimeout(() => setEditingProduct(null), 0);
                                            }}>
                                                Hủy
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                {/* Product List */}
                                <div className="grid gap-4">
                                    {products?.map((product) => (
                                        <Card key={product.id}>
                                            <CardContent className="flex justify-between items-center p-4">
                                                <div>
                                                    <h3 className="font-semibold">{product.name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {product.description}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setEditingProduct(product)}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => deleteProductMutation.mutate(product.id)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="news">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quản lý tin tức</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {/* Add/Edit News Form */}
                                {!editingNews ? (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.currentTarget);
                                            createNewsMutation.mutate({
                                                title: formData.get("title") as string,
                                                content: formData.get("content") as string,
                                                image: formData.get("image") as string,
                                            });
                                            e.currentTarget.reset();
                                        }}
                                        className="space-y-4"
                                    >
                                        <Input name="title" defaultValue="" placeholder="Tiêu đề" required />
                                        <Textarea name="content" defaultValue="" placeholder="Nội dung" required />
                                        <Input name="image" defaultValue="" placeholder="Đường dẫn ảnh" required />
                                        <Button type="submit">Thêm mới</Button>
                                    </form>
                                ) : (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.currentTarget);
                                            updateNewsMutation.mutate({
                                                id: editingNews.id,
                                                news: {
                                                    title: formData.get("title") as string,
                                                    content: formData.get("content") as string,
                                                    image: formData.get("image") as string,
                                                },
                                            });
                                        }}
                                        className="space-y-4"
                                    >
                                        <Input name="title" defaultValue={editingNews.title} required />
                                        <Textarea name="content" defaultValue={editingNews.content} required />
                                        <Input name="image" defaultValue={editingNews.image} required />
                                        <div className="flex gap-2">
                                            <Button type="submit">Cập nhật</Button>
                                            <Button type="button" variant="outline" onClick={() => {
                                                const emptyNews = {
                                                    ...editingNews,
                                                    title: '',
                                                    content: '',
                                                    image: ''
                                                };
                                                setEditingNews(emptyNews);
                                                setTimeout(() => setEditingNews(null), 0);
                                            }}>
                                                Hủy
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                {/* News List */}
                                <div className="grid gap-4">
                                    {news?.map((item) => (
                                        <Card key={item.id}>
                                            <CardContent className="flex justify-between items-center p-4">
                                                <div>
                                                    <h3 className="font-semibold">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setEditingNews(item)}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => deleteNewsMutation.mutate(item.id)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
