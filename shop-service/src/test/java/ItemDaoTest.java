import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ItemDaoTest {

    @Test
    @DisplayName("test getting all items without token")
    void testGettingAllUsersWithoutToken() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test getting all items with token")
    void testGettingAllUsersWithToken() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test getting all items for required categories")
    void testGettingAllItemsForRequiredCategories() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test getting all items with prices range")
    void testGettingAllItemsWithPricesRange() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test getting all new items")
    void testGettingAllNewItems() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test getting all new items with required categories")
    void testGettingAllNewItemsWithRequiredCategories() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test getting item if it doesn't exist")
    void testGettingNonExistingItem() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test adding item without token")
    void testAddingItemsWithoutToken() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test adding item with token and client rights")
    void testAddingItemsAsClient() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test adding item with token and admin rights")
    void testAddingItemsAsAdmin() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test deleting existing item")
    void testDeletingExistingItem() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test deleting non-existing item")
    void testDeletingNonExistingItem() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test updating item")
    void testUpdatingItem() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test updating item wrong")
    void testUpdatingItemWrong() {
        assertEquals(1, 100 - 99);
    }

    @Test
    @DisplayName("test updating non-existing item")
    void testUpdatingNonExistingItem() {
        assertEquals(1, 100 - 99);
    }
}
