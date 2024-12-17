import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "./ui/use-toast";

interface ApiKeyFormProps {
  onSubmit: (apiKey: string, model: string) => void;
}

export const ApiKeyForm = ({ onSubmit }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira sua chave API",
        variant: "destructive",
      });
      return;
    }
    onSubmit(apiKey, selectedModel);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Bem-vindo ao Chat</h1>
          <p className="text-sm text-muted-foreground">
            Configure sua chave API para começar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Chave API OpenAI</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Modelo</Label>
            <RadioGroup
              value={selectedModel}
              onValueChange={setSelectedModel}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gpt-4o" id="gpt-4o" />
                <Label htmlFor="gpt-4o">GPT-4O (Melhor qualidade)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gpt-4o-mini" id="gpt-4o-mini" />
                <Label htmlFor="gpt-4o-mini">GPT-4O Mini (Mais rápido)</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            Começar a conversar
          </Button>
        </form>
      </div>
    </div>
  );
};