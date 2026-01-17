import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [
    {
      id: '1',
      title: '10 Essential Hair Care Tips for Healthy Hair',
      excerpt: 'Discover the top 10 tips to maintain healthy, shiny hair naturally.',
      content: `Maintaining healthy hair requires a combination of proper care, nutrition, and the right products. Here are 10 essential tips:

1. **Regular Oil Massage**: Massage your scalp with natural oils like coconut or argan oil at least twice a week. This improves blood circulation and nourishes hair follicles.

2. **Proper Washing**: Don't overwash your hair. 2-3 times a week is usually sufficient. Use lukewarm water and a gentle shampoo.

3. **Condition Regularly**: Always use a conditioner after shampooing to restore moisture and prevent breakage.

4. **Avoid Heat Styling**: Limit the use of hair dryers, straighteners, and curling irons. When you must use them, apply a heat protectant.

5. **Trim Regularly**: Get a trim every 6-8 weeks to remove split ends and promote healthy growth.

6. **Eat a Balanced Diet**: Include proteins, vitamins (especially B, C, D, E), and minerals like iron and zinc in your diet.

7. **Stay Hydrated**: Drink plenty of water to keep your hair and scalp hydrated.

8. **Protect from Sun**: Wear a hat or use hair products with UV protection when spending time in the sun.

9. **Gentle Brushing**: Use a wide-tooth comb or soft-bristle brush. Start from the ends and work your way up.

10. **Reduce Stress**: High stress levels can lead to hair loss. Practice relaxation techniques like meditation or yoga.`,
      category: 'tips',
      author: 'Hair Care Expert',
      createdAt: new Date('2024-01-10'),
      readTime: 5,
      tags: ['hair care', 'tips', 'healthy hair']
    },
    {
      id: '2',
      title: 'Benefits of Coconut Oil for Hair',
      excerpt: 'Learn why coconut oil is one of the best natural treatments for your hair.',
      content: `Coconut oil has been used for centuries as a natural hair treatment. Here's why it's so effective:

**Deep Conditioning**: Coconut oil penetrates the hair shaft better than other oils, providing deep conditioning from within.

**Protein Protection**: It helps prevent protein loss in hair, which is essential for maintaining strength and preventing breakage.

**Antimicrobial Properties**: The lauric acid in coconut oil has antimicrobial properties that can help prevent scalp infections and dandruff.

**Hair Growth**: Regular massage with coconut oil improves blood circulation to the scalp, promoting hair growth.

**Shine and Luster**: It adds natural shine and luster to your hair without making it greasy when used correctly.

**Split End Prevention**: Regular use can help prevent and reduce split ends.

**How to Use**: Warm the oil slightly, apply to your scalp and hair, massage gently, leave for 30 minutes to overnight, then wash with a mild shampoo.`,
      category: 'ingredients',
      author: 'Natural Beauty Expert',
      createdAt: new Date('2024-01-12'),
      readTime: 4,
      tags: ['coconut oil', 'ingredients', 'natural treatment']
    },
    {
      id: '3',
      title: 'How to Apply Hair Oil Correctly',
      excerpt: 'A step-by-step guide to applying hair oil for maximum benefits.',
      content: `Applying hair oil correctly is crucial for getting the best results. Follow these steps:

**Step 1: Choose the Right Oil**
Select an oil suitable for your hair type - coconut for dry hair, argan for damaged hair, jojoba for oily scalp.

**Step 2: Warm the Oil**
Gently warm the oil by placing the bottle in warm water. Never heat it directly on the stove.

**Step 3: Section Your Hair**
Divide your hair into sections to ensure even application.

**Step 4: Apply to Scalp**
Start by applying oil to your scalp using your fingertips. Massage in circular motions for 5-10 minutes.

**Step 5: Apply to Hair**
Work the oil through the length of your hair, focusing on the ends which are usually the driest.

**Step 6: Cover and Wait**
Cover your hair with a shower cap or towel and leave for at least 30 minutes. For deep treatment, leave overnight.

**Step 7: Wash Thoroughly**
Use a mild shampoo to wash out the oil. You may need to shampoo twice to remove all the oil.

**Frequency**: 2-3 times a week for best results.`,
      category: 'guides',
      author: 'Hair Care Specialist',
      createdAt: new Date('2024-01-14'),
      readTime: 3,
      tags: ['application', 'guide', 'hair oil']
    },
    {
      id: '4',
      title: 'Frequently Asked Questions',
      excerpt: 'Common questions about hair oils answered by experts.',
      content: `**Q: How often should I oil my hair?**
A: 2-3 times a week is ideal. However, it depends on your hair type and scalp condition.

**Q: Can I leave oil in my hair overnight?**
A: Yes, leaving oil overnight provides deep conditioning. Just make sure to wash it thoroughly the next morning.

**Q: Which oil is best for hair growth?**
A: Castor oil and coconut oil are both excellent for promoting hair growth. Castor oil is particularly effective.

**Q: Will oil make my hair greasy?**
A: If applied correctly and washed properly, hair oil should not leave your hair greasy. Use the right amount for your hair length.

**Q: Can I use multiple oils together?**
A: Yes, you can mix different oils. A popular combination is coconut oil with a few drops of castor or argan oil.

**Q: How long before I see results?**
A: Most people notice improvements in hair texture and shine within 2-3 weeks. Hair growth takes longer, usually 2-3 months.

**Q: Is it safe to use oil on colored hair?**
A: Yes, natural oils are generally safe for colored hair and can actually help maintain color and prevent damage.`,
      category: 'faq',
      author: 'Customer Support',
      createdAt: new Date('2024-01-16'),
      readTime: 5,
      tags: ['FAQ', 'questions', 'hair care']
    }
  ];

  getArticles(category?: string): Observable<Article[]> {
    let articles = [...this.articles];
    if (category) {
      articles = articles.filter(a => a.category === category);
    }
    return of(articles).pipe(delay(200));
  }

  getArticle(id: string): Observable<Article | undefined> {
    const article = this.articles.find(a => a.id === id);
    return of(article).pipe(delay(200));
  }

  getFeaturedArticles(limit: number = 3): Observable<Article[]> {
    return of(this.articles.slice(0, limit)).pipe(delay(200));
  }
}
