# Instruções do Projeto Skynet Frontend

## Tecnologias e Padrões

### Framework e Estrutura
- **Nuxt 3**: Framework principal do projeto
- **Vue 3**: Usando **Options API** exclusivamente
- **TypeScript**: Para tipagem e melhor experiência de desenvolvimento

### Estilização
- **Tailwind CSS**: Framework CSS utilitário principal
- **PrimeVue**: Biblioteca de componentes UI
  - Usar componentes PrimeVue sempre que possível
  - Personalizar com Tailwind quando necessário
  - Seguir a documentação oficial do PrimeVue

## Princípios de Clean Code

### Nomenclatura
- Use nomes descritivos e significativos para variáveis, funções e componentes
- Componentes devem ter nomes em PascalCase (ex: `UserProfile.vue`)
- Arquivos de utilitários e composables em camelCase
- Constantes em UPPER_SNAKE_CASE

### Funções e Métodos
- Funções devem fazer apenas uma coisa
- Mantenha funções pequenas e focadas
- Evite efeitos colaterais não documentados
- Use parâmetros descritivos

### Comentários
- Código deve ser autoexplicativo
- Comentários apenas quando necessário para explicar "por quê", não "o quê"
- Mantenha comentários atualizados com o código

### Formatação
- Indentação consistente (2 espaços)
- Linhas de no máximo 100 caracteres quando possível
- Espaçamento consistente entre blocos lógicos

## Padrões Vue (Options API)

### Estrutura de Componente
```vue
<template>
  <!-- Template limpo e organizado -->
</template>

<script>
export default {
  name: 'ComponentName',
  
  components: {
    // Componentes importados
  },
  
  props: {
    // Props com validação
  },
  
  data() {
    return {
      // Estado do componente
    }
  },
  
  computed: {
    // Propriedades computadas
  },
  
  watch: {
    // Watchers
  },
  
  created() {
    // Lifecycle hook
  },
  
  mounted() {
    // Lifecycle hook
  },
  
  methods: {
    // Métodos do componente
  }
}
</script>

<style scoped>
/* Estilos específicos do componente */
</style>
```

### Boas Práticas Vue
- Sempre use Options API, nunca Composition API
- Props devem ter validação de tipo
- Use `computed` para valores derivados
- Use `methods` para ações e eventos
- Mantenha a lógica no JavaScript, não no template
- Use `v-bind` e `v-on` de forma clara
- Prefira `v-show` para alternância frequente, `v-if` para condições permanentes

## Componentização

### Princípios
- **Responsabilidade única**: Cada componente deve ter um propósito claro
- **Reutilizável**: Componentes devem ser genéricos quando possível
- **Composição**: Combine componentes pequenos para criar funcionalidades complexas
- **Props e Events**: Use props para passar dados, events para comunicar ações

### Estrutura de Pastas
```
components/
  ├── common/          # Componentes reutilizáveis genéricos
  ├── Layout/          # Componentes de layout
  ├── Dashboard/       # Componentes específicos do dashboard
  ├── Incidents/       # Componentes de incidentes
  ├── Reports/         # Componentes de relatórios
  └── Settings/        # Componentes de configurações
```

### Tipos de Componentes

#### 1. Componentes de Apresentação
- Focados em como as coisas aparecem
- Recebem dados via props
- Emitem eventos para o componente pai
- Não contêm lógica de negócio complexa

#### 2. Componentes de Container
- Focados em como as coisas funcionam
- Gerenciam estado e lógica
- Passam dados para componentes de apresentação
- Lidam com chamadas de API

#### 3. Componentes de Layout
- Estruturam a página
- Geralmente não têm lógica de negócio
- Usam slots para conteúdo dinâmico

### Exemplo de Componentização
```vue
<!-- Componente Container -->
<template>
  <UserList :users="userList" @user-selected="handleUserSelection" />
</template>

<script>
export default {
  name: 'UserListContainer',
  
  components: {
    UserList
  },
  
  data() {
    return {
      userList: []
    }
  },
  
  async created() {
    await this.fetchUsers()
  },
  
  methods: {
    async fetchUsers() {
      // Lógica de busca
    },
    
    handleUserSelection(user) {
      // Lógica de seleção
    }
  }
}
</script>
```

## Tailwind CSS

### Uso
- Use classes utilitárias do Tailwind para estilização
- Agrupe classes relacionadas logicamente
- Use `@apply` em componentes com muita repetição
- Mantenha classes em ordem lógica: layout → spacing → sizing → colors → typography

### Exemplo
```vue
<template>
  <div class="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800">Título</h2>
    <p class="text-sm text-gray-600">Descrição</p>
  </div>
</template>
```

### Responsividade
- Mobile-first approach
- Use breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Teste em diferentes tamanhos de tela

## PrimeVue

### Componentes
- Consulte sempre a documentação oficial
- Use temas e personalização quando necessário
- Integre com Tailwind para estilização adicional
- Aproveite componentes prontos: Button, DataTable, Dialog, etc.

### Exemplo
```vue
<template>
  <Button 
    label="Salvar" 
    icon="pi pi-check" 
    class="p-button-success"
    @click="handleSave" 
  />
</template>

<script>
import Button from 'primevue/button'

export default {
  name: 'SaveButton',
  
  components: {
    Button
  },
  
  methods: {
    handleSave() {
      // Lógica de salvamento
    }
  }
}
</script>
```

## Estrutura de Código

### Importações
```javascript
// 1. Bibliotecas externas
import { ref, computed } from 'vue'

// 2. Componentes
import UserCard from '~/components/UserCard.vue'

// 3. Composables e utilitários
import { useAuth } from '~/composables/useAuth'

// 4. Tipos e interfaces
import type { User } from '~/types/user'
```

### DRY (Don't Repeat Yourself)
- Extraia código duplicado para funções/componentes reutilizáveis
- Use composables para lógica compartilhada
- Crie componentes base para padrões comuns

## Testes e Qualidade

### Antes de Commitar
- [ ] Código segue as convenções do projeto
- [ ] Componentes são reutilizáveis e bem estruturados
- [ ] Sem código duplicado
- [ ] Nomes descritivos e claros
- [ ] Funciona em diferentes tamanhos de tela
- [ ] Sem console.logs desnecessários
- [ ] Código comentado apenas quando necessário

## Exemplos Práticos

### Componente Simples
```vue
<template>
  <div class="card p-4 bg-white rounded-lg shadow">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
    <Button 
      :label="buttonLabel" 
      @click="handleClick"
      class="mt-4"
    />
  </div>
</template>

<script>
import Button from 'primevue/button'

export default {
  name: 'InfoCard',
  
  components: {
    Button
  },
  
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    buttonLabel: {
      type: String,
      default: 'Ação'
    }
  },
  
  methods: {
    handleClick() {
      this.$emit('action-clicked')
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}
</style>
```

## Recursos Úteis

- [Documentação Nuxt 3](https://nuxt.com)
- [Documentação Vue 3 Options API](https://vuejs.org/api/)
- [Documentação Tailwind CSS](https://tailwindcss.com)
- [Documentação PrimeVue](https://primevue.org)
- [Clean Code Principles](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

---

**Lembre-se**: Código limpo é código que outros desenvolvedores podem ler e entender facilmente. Escreva pensando em quem virá depois de você!
