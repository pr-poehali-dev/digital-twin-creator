import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [activeModule, setActiveModule] = useState('overview');

  // Демо данные для визуализации
  const demoData = {
    health: { weight: 75, height: 175, age: 28, activity: 85 },
    behavior: { screenTime: 6.5, movementPattern: 'Активный', speechFreq: 'Высокая' },
    analytics: { dataPoints: 15420, patterns: 23, aiAccuracy: 94 }
  };

  const LoginForm = () => (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Icon name="brain" size={32} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Цифровой Двойник</h1>
        <p className="text-gray-600">Создание вашего ИИ-профиля</p>
      </div>
      
      <div className="space-y-4">
        <Input 
          placeholder="Ваше имя" 
          value={user.name}
          onChange={(e) => setUser({...user, name: e.target.value})}
          className="animate-scale-in"
        />
        <Input 
          placeholder="Email" 
          type="email"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          className="animate-scale-in"
        />
        <Button 
          onClick={() => setIsAuthenticated(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition-all duration-300"
          disabled={!user.name || !user.email}
        >
          <Icon name="log-in" className="mr-2" size={16} />
          Создать профиль
        </Button>
      </div>
    </div>
  );

  const DataModule = ({ title, icon, data, description }: {
    title: string;
    icon: string;
    data: Record<string, any>;
    description: string;
  }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={16} className="text-blue-600" />
          </div>
          <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 capitalize">{key}:</span>
              <Badge variant="secondary" className="text-xs">
                {typeof value === 'number' ? value.toFixed(1) : value}
              </Badge>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">{description}</p>
      </CardContent>
    </Card>
  );

  const MainApp = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Icon name="brain" size={16} className="text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Цифровой Двойник</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Привет, {user.name}!</span>
              <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
                <Icon name="log-out" size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeModule} onValueChange={setActiveModule}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="modules">Модули</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Точность ИИ</p>
                      <p className="text-2xl font-bold text-blue-800">{demoData.analytics.aiAccuracy}%</p>
                    </div>
                    <Icon name="trending-up" className="text-blue-600" size={24} />
                  </div>
                  <Progress value={demoData.analytics.aiAccuracy} className="mt-3" />
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Паттерны</p>
                      <p className="text-2xl font-bold text-green-800">{demoData.analytics.patterns}</p>
                    </div>
                    <Icon name="bar-chart-3" className="text-green-600" size={24} />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Данные</p>
                      <p className="text-2xl font-bold text-purple-800">{demoData.analytics.dataPoints.toLocaleString()}</p>
                    </div>
                    <Icon name="database" className="text-purple-600" size={24} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DataModule 
                title="Физические показатели"
                icon="activity"
                data={demoData.health}
                description="Автоматический сбор данных о здоровье и активности"
              />
              <DataModule 
                title="Поведенческие паттерны"
                icon="smartphone"
                data={demoData.behavior}
                description="Анализ использования устройств и коммуникации"
              />
            </div>

            {/* AI Insights */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="brain" size={20} />
                  ИИ-Анализ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Паттерн активности:</strong> Вы наиболее активны в утренние часы (7-9 утра) и вечером (18-20 часов)
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Коммуникация:</strong> Высокая частота использования голосовых сообщений, предпочтение коротких текстовых фраз
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Рекомендация:</strong> Для повышения точности модели рекомендуется активация модуля "Эмоциональное состояние"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Создание профиля</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <img 
                    src="/img/151893cb-598e-40ac-8d14-444612bf319b.jpg" 
                    alt="Digital Twin" 
                    className="w-64 h-64 object-cover rounded-lg mx-auto mb-6"
                  />
                  <p className="text-gray-600 mb-4">Расширенная настройка профиля будет доступна в следующих версиях</p>
                  <Button variant="outline">
                    <Icon name="settings" className="mr-2" size={16} />
                    Настроить профиль
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Физическая активность', icon: 'activity', status: 'active' },
                { name: 'Речевые паттерны', icon: 'mic', status: 'active' },
                { name: 'Геолокация', icon: 'map-pin', status: 'pending' },
                { name: 'Эмоциональное состояние', icon: 'heart', status: 'pending' },
                { name: 'Социальные связи', icon: 'users', status: 'pending' },
                { name: 'Рабочие привычки', icon: 'briefcase', status: 'pending' }
              ].map((module) => (
                <Card key={module.name} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          module.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <Icon name={module.icon} size={16} className={
                            module.status === 'active' ? 'text-green-600' : 'text-gray-600'
                          } />
                        </div>
                        <span className="font-medium text-gray-900">{module.name}</span>
                      </div>
                      <Badge variant={module.status === 'active' ? 'default' : 'secondary'}>
                        {module.status === 'active' ? 'Активен' : 'Ожидает'}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      disabled={module.status === 'active'}
                    >
                      {module.status === 'active' ? 'Настроить' : 'Активировать'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="clock" size={20} />
                  История активности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: '2 минуты назад', event: 'Обновлены данные активности', type: 'update' },
                    { time: '15 минут назад', event: 'Обнаружен новый паттерн поведения', type: 'insight' },
                    { time: '1 час назад', event: 'Синхронизация с носимыми устройствами', type: 'sync' },
                    { time: '3 часа назад', event: 'Анализ речевых паттернов завершен', type: 'analysis' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        item.type === 'update' ? 'bg-blue-500' : 
                        item.type === 'insight' ? 'bg-green-500' : 
                        item.type === 'sync' ? 'bg-purple-500' : 'bg-orange-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.event}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <LoginForm />
        </div>
      ) : (
        <MainApp />
      )}
    </div>
  );
};

export default Index;